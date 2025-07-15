import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './course.service';

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: any;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit() {
    const courseName = this.route.snapshot.paramMap.get('courseName');
    this.course = this.courseService.getCourseByName(courseName || '');
  }
}