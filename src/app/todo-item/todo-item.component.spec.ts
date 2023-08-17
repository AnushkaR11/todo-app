import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit markAsComplete event when method is called', () => {
    spyOn(component.markAsComplete, 'emit');
    component.markAsComplete.emit();
    expect(component.markAsComplete.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit editTodoTitle event when saveEdit method is invoked', () => {
    spyOn(component.editTodoTitle, 'emit');
    component.editedTitle = 'New task';
    component.saveEdit();
    expect(component.editTodoTitle.emit).toHaveBeenCalledWith('New task');
  });

  it('should not emit editTodoTitle event when saveEdit method invoked but editedTitle is blank', () => {
    spyOn(component.editTodoTitle, 'emit');
    component.editedTitle = '';
    component.saveEdit();
    expect(component.editTodoTitle.emit).not.toHaveBeenCalled();
  });

  it('should clear editedTitle and set toEdit to false when cancelEdit method is invoked', () => {
    component.toEdit = true;
    component.editedTitle = 'New task';
    component.cancelEdit();
    expect(component.editedTitle).toEqual('');
    expect(component.toEdit).toEqual(false);
  });

  it('should emit deleteTodoTask event on button click', () => {
    let emitted = false;
    component.deleteTodoTask.subscribe(() => (emitted = true));
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('.btn-danger'));
    deleteButton.nativeElement.click();
    expect(emitted).toBe(true);
  });


});
