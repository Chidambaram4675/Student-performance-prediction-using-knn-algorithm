export interface Student {
  id: number;
  studyHours: number; // 0-20
  attendance: number; // 0-100
  previousGrade: number; // 0-100
  sleepHours: number; // 0-12
  extracurricularHours: number; // 0-10
  familySupport: number; // 1-5
  performance: number; // 0-100 (Target)
}

export const studentDataset: Student[] = [
  { id: 1, studyHours: 15, attendance: 95, previousGrade: 88, sleepHours: 8, extracurricularHours: 2, familySupport: 5, performance: 92 },
  { id: 2, studyHours: 5, attendance: 70, previousGrade: 60, sleepHours: 6, extracurricularHours: 5, familySupport: 3, performance: 55 },
  { id: 3, studyHours: 10, attendance: 85, previousGrade: 75, sleepHours: 7, extracurricularHours: 3, familySupport: 4, performance: 78 },
  { id: 4, studyHours: 18, attendance: 98, previousGrade: 92, sleepHours: 9, extracurricularHours: 1, familySupport: 5, performance: 95 },
  { id: 5, studyHours: 2, attendance: 50, previousGrade: 40, sleepHours: 5, extracurricularHours: 8, familySupport: 2, performance: 35 },
  { id: 6, studyHours: 12, attendance: 90, previousGrade: 80, sleepHours: 7, extracurricularHours: 4, familySupport: 4, performance: 82 },
  { id: 7, studyHours: 8, attendance: 75, previousGrade: 65, sleepHours: 6, extracurricularHours: 6, familySupport: 3, performance: 62 },
  { id: 8, studyHours: 14, attendance: 92, previousGrade: 85, sleepHours: 8, extracurricularHours: 2, familySupport: 5, performance: 88 },
  { id: 9, studyHours: 4, attendance: 60, previousGrade: 55, sleepHours: 5, extracurricularHours: 7, familySupport: 2, performance: 48 },
  { id: 10, studyHours: 16, attendance: 96, previousGrade: 90, sleepHours: 8, extracurricularHours: 3, familySupport: 5, performance: 93 },
  { id: 11, studyHours: 7, attendance: 80, previousGrade: 70, sleepHours: 6, extracurricularHours: 5, familySupport: 3, performance: 68 },
  { id: 12, studyHours: 11, attendance: 88, previousGrade: 78, sleepHours: 7, extracurricularHours: 4, familySupport: 4, performance: 80 },
  { id: 13, studyHours: 3, attendance: 55, previousGrade: 45, sleepHours: 5, extracurricularHours: 9, familySupport: 2, performance: 40 },
  { id: 14, studyHours: 19, attendance: 99, previousGrade: 95, sleepHours: 9, extracurricularHours: 1, familySupport: 5, performance: 98 },
  { id: 15, studyHours: 6, attendance: 72, previousGrade: 62, sleepHours: 6, extracurricularHours: 6, familySupport: 3, performance: 58 },
  { id: 16, studyHours: 13, attendance: 91, previousGrade: 82, sleepHours: 8, extracurricularHours: 3, familySupport: 4, performance: 85 },
  { id: 17, studyHours: 9, attendance: 82, previousGrade: 72, sleepHours: 7, extracurricularHours: 5, familySupport: 3, performance: 74 },
  { id: 18, studyHours: 17, attendance: 97, previousGrade: 91, sleepHours: 8, extracurricularHours: 2, familySupport: 5, performance: 94 },
  { id: 19, studyHours: 1, attendance: 40, previousGrade: 30, sleepHours: 4, extracurricularHours: 10, familySupport: 1, performance: 25 },
  { id: 20, studyHours: 10, attendance: 85, previousGrade: 75, sleepHours: 7, extracurricularHours: 4, familySupport: 4, performance: 77 },
  { id: 21, studyHours: 12, attendance: 88, previousGrade: 82, sleepHours: 7, extracurricularHours: 3, familySupport: 4, performance: 84 },
  { id: 22, studyHours: 5, attendance: 65, previousGrade: 58, sleepHours: 6, extracurricularHours: 7, familySupport: 2, performance: 52 },
  { id: 23, studyHours: 15, attendance: 94, previousGrade: 87, sleepHours: 8, extracurricularHours: 2, familySupport: 5, performance: 90 },
  { id: 24, studyHours: 8, attendance: 78, previousGrade: 68, sleepHours: 6, extracurricularHours: 5, familySupport: 3, performance: 70 },
  { id: 25, studyHours: 14, attendance: 93, previousGrade: 86, sleepHours: 8, extracurricularHours: 3, familySupport: 4, performance: 89 },
];
