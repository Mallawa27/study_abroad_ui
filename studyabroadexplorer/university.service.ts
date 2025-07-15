import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private universities = [
    { name: 'University of Oxford', country: 'uk', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'], about: 'One of the oldest universities in the world, renowned for its academic excellence.', rating: 4.8 },
    { name: 'Harvard University', country: 'usa', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['sat', 'gmat', 'gre', 'toefl'], about: 'A leading Ivy League institution with a global reputation.', rating: 4.9 },
    { name: 'University of Toronto', country: 'canada', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'], about: 'Known for its research and diverse academic programs.', rating: 4.6 },
    { name: 'University of Tokyo', country: 'japan', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['toefl', 'gre'], about: 'A top university in Asia with strong engineering programs.', rating: 4.7 },
    { name: 'University of Melbourne', country: 'australia', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'], about: 'Renowned for its vibrant campus and research opportunities.', rating: 4.5 },
    { name: 'Trinity College Dublin', country: 'ireland', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'], about: 'A historic university with a rich academic heritage.', rating: 4.4 },
    { name: 'Technical University of Munich', country: 'germany', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl', 'gre'], about: 'A leader in technology and innovation.', rating: 4.6 },
    { name: 'Stanford University', country: 'usa', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['sat', 'gmat', 'gre', 'toefl'], about: 'Known for its entrepreneurial spirit and tech advancements.', rating: 4.9 },
    { name: 'University of Cambridge', country: 'uk', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'], about: 'A prestigious university with a global academic impact.', rating: 4.8 },
    { name: 'McGill University', country: 'canada', courseLevels: ['bachelors', 'masters', 'phd'], examsAccepted: ['ielts', 'toefl'], about: 'Recognized for its research and multicultural environment.', rating: 4.3 },
  ];

  getUniversityByName(name: string) {
    return this.universities.find(uni => uni.name === decodeURIComponent(name)) || null;
  }
}