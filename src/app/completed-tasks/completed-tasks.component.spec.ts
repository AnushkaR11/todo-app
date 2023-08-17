import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedTasksComponent } from './completed-tasks.component';
import { By } from '@angular/platform-browser';
import { Todo } from '../models/todo';

describe('CompletedTasksComponent', () => {
  let component: CompletedTasksComponent;
  let fixture: ComponentFixture<CompletedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedTasksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTasksComponent);
    component = fixture.componentInstance;
  });

  it('should display completed task title', () => {
    const testTitle = 'Test Title';
    component.todoObj = { title: testTitle, completed: true };
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(
      By.css('.card-body')
    ).nativeNode;

    expect(titleElement.textContent).toContain(testTitle);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteTodoTask event on button click', () => {
    let emitted = false;
    component.deleteTodoTask.subscribe(() => (emitted = true));

    component.todoObj = { title: 'Test Title', completed: true };
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('.btn-danger'));
    deleteButton.nativeElement.click();
    expect(emitted).toBe(true);
  });
});
