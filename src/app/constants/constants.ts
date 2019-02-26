export enum USER {
    STAFF = 2,
    TEACHER = 3,
    PARENT = 4,
    STUDENT = 5
}

export enum QEH {
    QUIZ = 1,
    EXAM = 2,
    HOMEWORK = 3,
    EXERCISE = 4,
}

export enum QEH_TYPE {
    mc = 1,
    id = 2,
    en = 3,
    tf = 4,
    es = 5
}

export enum QEH_STATUS {
    Unpublished = 'Unpublished',
    Published = 'Published',
    Ongoing = 'Ongoing',
    Done = 'Done'
}

export enum QEH_CATEGORY {
    Quiz = 1,
    Exam = 2,
    Homework = 3,
    Excercise = 4,
}

export const getQEHCategory = (cat, plural = false) => {
    switch (cat * 1) {
        case QEH_CATEGORY.Quiz: return plural ? 'Quizzes' : 'Quiz';
        case QEH_CATEGORY.Exam: return plural ? 'Exams' : 'Exam';
        case QEH_CATEGORY.Homework: return plural ? 'Homeworks' : 'Homework';
        case QEH_CATEGORY.Excercise: return plural ? 'Excercises' : 'Excercise';
    }
};

export const getQEHLength = (list: any, status: QEH_STATUS) => {

    const ret = (status === QEH_STATUS.Published) ?
        list.filter(d => d.published) :
        list.filter(d => d.status.toLowerCase() === status.toLowerCase());

    return ret.length;
};


