/**
 * @api {model} projeto/src/app/courses/courses.model.ts Courses Model
 * @apiName Course Model
 * @apiGroup Course
 * @apiParam {string} name Course's name.
 * @apiParam {number} credits Course's credits.
 * @apiParam {enum} type Course's type (Optional, complementary, mandatory or elective).
 * @apiParam {number} recomendedSemester Indicated semester to enroll this course.
 * @apiParam {string} offererDepartment Department wich is offering this course.
 * @apiParam {string} requesterDepartment Department wich is requiring this course.
 */

export class Course {
    constructor(
        name: string,
        credits: string,
        type: string,
        recomendedSemester: number,
        offererDepartment: string,
        requesterDepartment: String
    ) {}

}