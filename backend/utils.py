# backend/utils.py

import os
import json
import re
from app import db
from models import Provider, Exam, Topic

def format_exam_title(exam_file):
    filename = exam_file.replace('.json', '')
    filename = re.sub(r'__topic-\d+', '', filename)
    parts = filename.split('_')
    if len(parts) > 1:
        filename = '_'.join(parts[1:])
    return filename

def load_data_into_db():
    root_dir = 'providers'
    for provider_name in os.listdir(root_dir):
        provider_path = os.path.join(root_dir, provider_name)
        if os.path.isdir(provider_path):
            provider = Provider.query.filter_by(name=provider_name).first()
            if not provider:
                provider = Provider(name=provider_name, is_popular=provider_name.lower() in ['amazon', 'microsoft', 'google'])
                db.session.add(provider)
                db.session.commit()

            exam_question_counts = {}

            for exam_file in os.listdir(provider_path):
                if exam_file.endswith('.json'):
                    file_path = os.path.join(provider_path, exam_file)
                    with open(file_path, 'r') as f:
                        exam_data = json.load(f)
                    
                    exam_title = format_exam_title(exam_file)
                    question_count = max(question['index'] for question in exam_data) if exam_data else 0
                    
                    exam_question_counts[exam_title] = exam_question_counts.get(exam_title, 0) + question_count
                    
                    exam_id = f"{provider.name}-{exam_title}"
                    exam = Exam.query.get(exam_id)
                    if not exam:
                        exam = Exam(id=exam_id, title=exam_title, total_questions=0, provider_id=provider.id)
                        db.session.add(exam)
                        db.session.commit()
                    
                    topic_number_match = re.search(r'__topic-(\d+)', exam_file)
                    topic_number = int(topic_number_match.group(1)) if topic_number_match else 1
                    
                    topic = Topic.query.filter_by(number=topic_number, exam_id=exam.id).first()
                    if not topic:
                        topic = Topic(number=topic_number, data=exam_data, exam_id=exam.id)
                        db.session.add(topic)
            
            for exam_title, total_questions in exam_question_counts.items():
                exam_id = f"{provider.name}-{exam_title}"
                exam = Exam.query.get(exam_id)
                if exam:
                    exam.total_questions = total_questions
            
            db.session.commit()

def get_exam_order(exam_title, provider_name):
    if provider_name.lower() == 'amazon':
        order_map = {
            'AWS Certified Cloud Practitioner': 1,
            'AWS Certified Solutions Architect Associate': 2,
            'AWS Certified Developer Associate': 3,
            'AWS Certified SysOps Administrator Associate': 4,
            'AWS Certified Solutions Architect Professional': 5,
            'AWS Certified DevOps Engineer Professional': 6,
            'AWS Certified Advanced Networking Specialty': 7,
            'AWS Certified Data Analytics Specialty': 8,
            'AWS Certified Database Specialty': 9,
            'AWS Certified Machine Learning Specialty': 10,
            'AWS Certified Security Specialty': 11,
            'AWS Certified SAP On AWS Specialty': 12,
            'AWS Certified Data Engineer Associate': 13,
            'AWS Certified Alexa Skill Builder Specialty': 14,
            'AWS Certified Big Data Specialty': 15,
        }
        
        version_priority = {
            'C03': 1,
            'C02': 2,
            'C01': 3,
            'C00': 4,
        }
        
        base_order = 100
        for key, value in order_map.items():
            if key.lower() in exam_title.lower():
                base_order = value
                break
        
        for version, priority in version_priority.items():
            if version in exam_title:
                return base_order * 10 + priority
        
        return base_order * 10

    elif provider_name.lower() == 'google':
        order_map = {
            'Google Cloud Digital Leader': 1,
            'Google Associate Cloud Engineer': 2,
            'Google Professional Cloud Architect': 3,
            'Google Professional Data Engineer': 4,
            'Google Professional Cloud Developer': 5,
            'Google Professional Cloud Network Engineer': 6,
            'Google Professional Cloud Security Engineer': 7,
            'Google Professional Cloud DevOps Engineer': 8,
            'Google Professional Machine Learning Engineer': 9,
            'Google Professional Cloud Database Engineer': 10,
            'Google Professional Google Workspace Administrator': 11,
            'Google Professional ChromeOS Administrator': 12,
            'Google G Suite Certification': 13,
            'Google Professional Collaboration Engineer': 14,
            'Google Search Advertising': 15,
            'Google Video Advertising': 16,
            'Google Ads Individual Qualification': 17,
            'Google Analytics Individual Qualification': 18,
            'Google AdWords Fundamentals': 19,
        }
        
        # Special handling for specific exams
        if 'Google Professional ChromeOS Administrator' in exam_title:
            return 12
        elif 'Google G Suite Certification' in exam_title:
            return 13
        elif 'Google Professional Collaboration Engineer' in exam_title:
            return 14
        elif 'Google Analytics Individual Qualification' in exam_title:
            return 18
        elif 'Google AdWords Fundamentals' in exam_title:
            return 19
        
        for key, value in order_map.items():
            if key.lower() in exam_title.lower():
                return value
        return 100

    return 0