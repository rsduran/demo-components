# backend/routes.py

from flask import jsonify, abort, request
from app import app, db
from models import Provider, Exam, Topic, UserPreference, FavoriteQuestion, UserAnswer, ExamAttempt
from utils import get_exam_order
from datetime import datetime

@app.route('/api/providers', methods=['GET'])
def get_providers():
    page = request.args.get('page', type=int)
    per_page = request.args.get('per_page', type=int)
    
    if page is None or per_page is None:
        providers = Provider.query.all()
        return jsonify({
            'providers': [
                {
                    'name': provider.name,
                    'exams': sorted([
                        {
                            'id': f"{provider.name}-{exam.title}",
                            'title': exam.title,
                            'progress': exam.progress,
                            'totalQuestions': exam.total_questions,
                            'order': get_exam_order(exam.title, provider.name)
                        } for exam in provider.exams
                    ], key=lambda x: (x['order'], x['title'])),
                    'isPopular': provider.is_popular
                } for provider in providers
            ],
            'total': len(providers),
            'pages': 1,
            'current_page': 1
        })
    else:
        providers = Provider.query.paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'providers': [
                {
                    'name': provider.name,
                    'exams': sorted([
                        {
                            'id': f"{provider.name}-{exam.title}",
                            'title': exam.title,
                            'progress': exam.progress,
                            'totalQuestions': exam.total_questions,
                            'order': get_exam_order(exam.title, provider.name)
                        } for exam in provider.exams
                    ], key=lambda x: (x['order'], x['title'])),
                    'isPopular': provider.is_popular
                } for provider in providers.items
            ],
            'total': providers.total,
            'pages': providers.pages,
            'current_page': page
        })

@app.route('/api/exams/<exam_id>', methods=['GET'])
def get_exam(exam_id):
    if exam_id == 'undefined' or '-' not in exam_id:
        abort(400, description="Invalid exam ID")
    
    provider_name, exam_title = exam_id.split('-', 1)
    provider = Provider.query.filter_by(name=provider_name).first()
    if not provider:
        abort(404, description="Provider not found")
    
    exam = Exam.query.filter_by(title=exam_title, provider_id=provider.id).first()
    if not exam:
        abort(404, description="Exam not found")
    
    exam_data = {
        'id': exam_id,
        'provider': provider.name,
        'examTitle': exam.title,
        'examCode': '',
        'topics': {topic.number: topic.data for topic in exam.topics}
    }
    
    exam_title_parts = exam.title.split('-code-')
    if len(exam_title_parts) == 2:
        exam_data['examTitle'], exam_data['examCode'] = exam_title_parts
    
    # Update last_visited_exam
    user_id = 1  # You'd get this from authentication in a real app
    preference = UserPreference.query.filter_by(user_id=user_id).first()
    if preference:
        preference.last_visited_exam = exam_id
    else:
        preference = UserPreference(user_id=user_id, last_visited_exam=exam_id)
        db.session.add(preference)
    db.session.commit()
    
    return jsonify(exam_data)

@app.route('/api/user-preference', methods=['GET', 'POST'])
def user_preference():
    # For simplicity, we're using a hardcoded user_id. In a real app, you'd get this from authentication.
    user_id = 1

    if request.method == 'GET':
        preference = UserPreference.query.filter_by(user_id=user_id).first()
        if preference:
            return jsonify({'last_visited_exam': preference.last_visited_exam})
        return jsonify({'last_visited_exam': None})

    elif request.method == 'POST':
        data = request.json
        preference = UserPreference.query.filter_by(user_id=user_id).first()
        if preference:
            preference.last_visited_exam = data['last_visited_exam']
        else:
            preference = UserPreference(user_id=user_id, last_visited_exam=data['last_visited_exam'])
            db.session.add(preference)
        db.session.commit()
        return jsonify({'message': 'Preference updated successfully'})

@app.route('/api/favorite', methods=['POST'])
def favorite_question():
    data = request.json
    user_id = 1  # For simplicity, we're using a hardcoded user_id. In a real app, you'd get this from authentication.
    exam_id = data['exam_id']
    topic_number = data['topic_number']
    question_index = data['question_index']

    favorite = FavoriteQuestion.query.filter_by(
        user_id=user_id,
        exam_id=exam_id,
        topic_number=topic_number,
        question_index=question_index
    ).first()

    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': 'Question unfavorited successfully', 'is_favorite': False}), 200
    else:
        new_favorite = FavoriteQuestion(
            user_id=user_id,
            exam_id=exam_id,
            topic_number=topic_number,
            question_index=question_index
        )
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify({'message': 'Question favorited successfully', 'is_favorite': True}), 201

@app.route('/api/favorites/<exam_id>', methods=['GET'])
def get_favorite_questions(exam_id):
    user_id = 1  # For simplicity, we're using a hardcoded user_id. In a real app, you'd get this from authentication.
    favorites = FavoriteQuestion.query.filter_by(user_id=user_id, exam_id=exam_id).order_by(FavoriteQuestion.topic_number, FavoriteQuestion.question_index).all()
    return jsonify({
        'favorites': [
            {
                'topic_number': fav.topic_number,
                'question_index': fav.question_index
            } for fav in favorites
        ]
    })

@app.route('/api/save-answer', methods=['POST'])
def save_answer():
    data = request.json
    user_id = 1  # For simplicity, we're using a hardcoded user_id. In a real app, you'd get this from authentication.
    exam_id = data['exam_id']
    topic_number = data['topic_number']
    question_index = data['question_index']
    selected_options = data['selected_options']

    user_answer = UserAnswer.query.filter_by(
        user_id=user_id,
        exam_id=exam_id,
        topic_number=topic_number,
        question_index=question_index
    ).first()

    if user_answer:
        user_answer.selected_options = selected_options
    else:
        user_answer = UserAnswer(
            user_id=user_id,
            exam_id=exam_id,
            topic_number=topic_number,
            question_index=question_index,
            selected_options=selected_options
        )
        db.session.add(user_answer)

    db.session.commit()
    return jsonify({'message': 'Answer saved successfully'}), 200

@app.route('/api/get-answers/<exam_id>', methods=['GET'])
def get_answers(exam_id):
    user_id = 1  # For simplicity, we're using a hardcoded user_id. In a real app, you'd get this from authentication.
    user_answers = UserAnswer.query.filter_by(user_id=user_id, exam_id=exam_id).all()
    return jsonify({
        'answers': [
            {
                'topic_number': answer.topic_number,
                'question_index': answer.question_index,
                'selected_options': answer.selected_options
            } for answer in user_answers
        ]
    })

@app.route('/api/submit-answers', methods=['POST'])
def submit_answers():
    data = request.json
    exam_id = data['exam_id']
    user_answers = data['user_answers']
    
    exam = Exam.query.get(exam_id)
    if not exam:
        return jsonify({'error': 'Exam not found'}), 404

    total_questions = 0
    correct_answers = 0
    incorrect_questions = []

    for topic in exam.topics:
        topic_data = topic.data
        for question_index, question in enumerate(topic_data):
            total_questions += 1
            question_id = f"T{topic.number} Q{question_index + 1}"
            correct_answer = set(question['answer'])
            user_answer = set(user_answers.get(question_id, []))

            correct_indices = set(ord(letter.upper()) - ord('A') for letter in correct_answer)
            user_indices = set(int(index) for index in user_answer)

            if correct_indices == user_indices:
                correct_answers += 1
            else:
                incorrect_questions.append(question_id)

    score = (correct_answers / total_questions) * 100 if total_questions > 0 else 0
    passed = score >= 75

    # Store the exam attempt
    user_id = 1  # Replace with actual user authentication
    exam_attempt = ExamAttempt(
        user_id=user_id,
        exam_id=exam_id,
        score=score,
        total_questions=total_questions,
        correct_answers=correct_answers,
        incorrect_questions=incorrect_questions,
        attempt_date=datetime.utcnow()
    )
    db.session.add(exam_attempt)
    db.session.commit()

    result = {
        'total_questions': total_questions,
        'correct_answers': correct_answers,
        'score': round(score, 2),
        'passed': passed,
        'incorrect_questions': incorrect_questions
    }

    return jsonify(result)

@app.route('/api/incorrect-questions/<exam_id>', methods=['GET'])
def get_incorrect_questions(exam_id):
    user_id = 1  # Replace with actual user authentication
    latest_attempt = ExamAttempt.query.filter_by(user_id=user_id, exam_id=exam_id).order_by(ExamAttempt.attempt_date.desc()).first()
    
    if not latest_attempt:
        return jsonify({'incorrect_questions': []})
    
    return jsonify({'incorrect_questions': latest_attempt.incorrect_questions})