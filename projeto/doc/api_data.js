define({ "api": [
  {
    "type": "component",
    "url": "projeto/src/app/allocations/add-alocation/add-alocation.component.ts",
    "title": "Add Allocation Component",
    "name": "Add_Allocation_Component",
    "group": "Allocation",
    "version": "0.0.0",
    "filename": "src/app/allocations/add-allocation/add-allocation.component.ts",
    "groupTitle": "Allocation"
  },
  {
    "type": "model",
    "url": "projeto/src/app/allocations/allocations.model.ts",
    "title": "Allocation Model",
    "name": "Allocation_Model",
    "group": "Allocation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "professorOne",
            "description": "<p>First Professor of the course.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "professorTwo",
            "description": "<p>Second Professor of the course.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "course",
            "description": "<p>Course's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "enum",
            "optional": false,
            "field": "courseType",
            "description": "<p>Course's type (Optional, complementary, mandatory or elective).</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "credits",
            "description": "<p>Course's credits.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "note",
            "description": "<p>Additional info about this allocation.</p>"
          }
        ]
      }
    },
    "description": "<p>Short Description.</p>",
    "version": "0.0.0",
    "filename": "src/app/allocations/allocation.model.ts",
    "groupTitle": "Allocation"
  },
  {
    "type": "module",
    "url": "projeto/src/app/allocations/allocations.module.ts",
    "title": "Allocation Module",
    "name": "Allocation_Module",
    "group": "Allocation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "AddAllocationComponent",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "AllocationTableComponent",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "EditAllocationComponent",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app/allocations/allocations.module.ts",
    "groupTitle": "Allocation"
  },
  {
    "type": "component",
    "url": "projeto/src/app/allocations/alocation-table/alocation-table.component.ts",
    "title": "Allocation Table Component",
    "name": "Allocation_Table_Component",
    "group": "Allocation",
    "version": "0.0.0",
    "filename": "src/app/allocations/allocation-table/allocation-table.component.ts",
    "groupTitle": "Allocation"
  },
  {
    "type": "component",
    "url": "projeto/src/app/allocations/edit-allocation/edit-allocation.component.ts",
    "title": "Edit Allocation Component",
    "name": "Edit_Allocation_Component",
    "group": "Allocation",
    "version": "0.0.0",
    "filename": "src/app/allocations/edit-allocation/edit-allocation.component.ts",
    "groupTitle": "Allocation"
  },
  {
    "type": "component",
    "url": "projeto/src/app/courses/add-course/add-course.component.ts",
    "title": "Add Course Component",
    "name": "Add_Course_Component",
    "group": "Course",
    "version": "0.0.0",
    "filename": "src/app/courses/add-course/add-course.component.ts",
    "groupTitle": "Course"
  },
  {
    "type": "model",
    "url": "projeto/src/app/courses/courses.model.ts",
    "title": "Courses Model",
    "name": "Course_Model",
    "group": "Course",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Course's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "credits",
            "description": "<p>Course's credits.</p>"
          },
          {
            "group": "Parameter",
            "type": "enum",
            "optional": false,
            "field": "type",
            "description": "<p>Course's type (Optional, complementary, mandatory or elective).</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "recomendedSemester",
            "description": "<p>Indicated semester to enroll this course.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "offererDepartment",
            "description": "<p>Department wich is offering this course.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "requesterDepartment",
            "description": "<p>Department wich is requiring this course.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app/courses/course.model.ts",
    "groupTitle": "Course"
  },
  {
    "type": "module",
    "url": "projeto/src/app/courses/courses.module.ts",
    "title": "Courses Module",
    "name": "Course_Module",
    "group": "Course",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "AddCourseComponent",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "EditCourseComponent",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "ViewCoursesComponent",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app/courses/courses.module.ts",
    "groupTitle": "Course"
  },
  {
    "type": "component",
    "url": "projeto/src/app/courses/edit-course/edit-course.component.ts",
    "title": "Edit Course Component",
    "name": "Edit_Course_Component",
    "group": "Course",
    "version": "0.0.0",
    "filename": "src/app/courses/edit-course/edit-course.component.ts",
    "groupTitle": "Course"
  },
  {
    "type": "component",
    "url": "projeto/src/app/courses/view-courses/view-courses.component.ts",
    "title": "View Courses Component",
    "name": "View_Courses_Component",
    "group": "Course",
    "version": "0.0.0",
    "filename": "src/app/courses/view-courses/view-courses.component.ts",
    "groupTitle": "Course"
  },
  {
    "type": "component",
    "url": "projeto/src/app/professors/add-professor/add-professor.component.ts",
    "title": "Add Professor Component",
    "name": "Add_Professor_Component",
    "group": "Professor",
    "version": "0.0.0",
    "filename": "src/app/professors/add-professor/add-professor.component.ts",
    "groupTitle": "Professor"
  },
  {
    "type": "component",
    "url": "projeto/src/app/professors/add-restriction/add-restriction.component.ts",
    "title": "Add Restriction Component",
    "name": "Add_Restriction_Component",
    "group": "Professor",
    "version": "0.0.0",
    "filename": "src/app/professors/add-restriction/add-restriction.component.ts",
    "groupTitle": "Professor"
  },
  {
    "type": "component",
    "url": "projeto/src/app/professors/edit-professor/edit-professor.component.ts",
    "title": "Edit Professor Component",
    "name": "Edit_Professor_Component",
    "group": "Professor",
    "version": "0.0.0",
    "filename": "src/app/professors/edit-professor/edit-professor.component.ts",
    "groupTitle": "Professor"
  },
  {
    "type": "model",
    "url": "projeto/src/app/professors/professor.model.ts",
    "title": "Professor Model",
    "name": "Professor_Model",
    "group": "Professor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Professor's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "SIAP",
            "description": "<p>Professor SIAP's number ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app/professors/professor.model.ts",
    "groupTitle": "Professor"
  },
  {
    "type": "model",
    "url": "projeto/src/app/professors/professor-restriction.model.ts",
    "title": "Professor Restriction Model",
    "name": "Professor_Restriction_Model",
    "group": "Professor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "SIAPSemester",
            "description": "<p>ID compound by professor SIAP's number and current semester</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "minCredits",
            "description": "<p>Minimum quantity of credits in a semester for a professor.</p>"
          },
          {
            "group": "Parameter",
            "type": "enum",
            "optional": false,
            "field": "maxCredits",
            "description": "<p>Maximum quantity of credits in a semester for a professor.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "posGraduatedCredits",
            "description": "<p>Quantity of credits of a professor in a postgraduate teaching.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "scheduleRestrictions",
            "description": "<p>List of schedule restrictions associated to a professor.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app/professors/professor-restriction.model.ts",
    "groupTitle": "Professor"
  },
  {
    "type": "module",
    "url": "projeto/src/app/professors/professors.module.ts",
    "title": "Professors Module",
    "name": "Professors_Module",
    "group": "Professor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "AddProfessorComponent",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "EditProfessorComponent",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "ViewProfessorsComponent",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "AddRestrictionComponent",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app/professors/professors.module.ts",
    "groupTitle": "Professor"
  },
  {
    "type": "model",
    "url": "projeto/src/app/professors/schedule-restriction.model.ts",
    "title": "Schedule Restriction Model",
    "name": "Schedule_Restriction_Model",
    "group": "Professor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "tough",
            "description": "<p>List of tough restrictions.</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "tractable",
            "description": "<p>List of tractable restrictions.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app/professors/schedule-restriction.model.ts",
    "groupTitle": "Professor"
  },
  {
    "type": "component",
    "url": "projeto/src/app/professors/view-professors/view-professors.component.ts",
    "title": "View Professors Component",
    "name": "View_Professors_Component",
    "group": "Professor",
    "version": "0.0.0",
    "filename": "src/app/professors/view-professors/view-professors.component.ts",
    "groupTitle": "Professor"
  },
  {
    "type": "component",
    "url": "projeto/src/app/semesters/add-semester/add-semester.component.ts",
    "title": "Add Semester Component",
    "name": "Add_Semester_Component",
    "group": "Semester",
    "version": "0.0.0",
    "filename": "src/app/semesters/add-semester/add-semester.component.ts",
    "groupTitle": "Semester"
  },
  {
    "type": "model",
    "url": "projeto/src/app/semesters/semester.model.ts",
    "title": "Semester Model",
    "name": "Semester_Model",
    "group": "Semester",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "semester_id",
            "description": "<p>Semester's ID (ie. 2017.1, 2017.2).</p>"
          },
          {
            "group": "Parameter",
            "type": "Allocation[]",
            "optional": false,
            "field": "allocations",
            "description": "<p>List of allocations for that semester.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app/semesters/semester.model.ts",
    "groupTitle": "Semester"
  },
  {
    "type": "module",
    "url": "projeto/src/app/semesters/semester.module.ts",
    "title": "Semester Module",
    "name": "Semester_Module",
    "group": "Semester",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "component",
            "optional": false,
            "field": "AddSemesterComponent",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app/semesters/semester.module.ts",
    "groupTitle": "Semester"
  }
] });
