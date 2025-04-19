package com.todolist.listtodo.model;

import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;

public class TodoModel{
    private int id;
    private String text;
    private String dueDate;
    private String state;
    private String doneDate;
    private int priority;
    private String creationDate;


    public TodoModel(){

    }

    public TodoModel(int _id, String _text, String _dueDate, String _state, String _doneDate, int _priority, String _creationDate ){
        this.id = _id;
        this.text = _text;
        this.dueDate = _dueDate;
        this.state = _state;
        this.doneDate = _doneDate;
        this.priority = _priority;
        this.creationDate = _creationDate;

    }

    

    public int getId(){return this.id;}
    public void setId(int id){this.id = id;}

    public String getText(){return this.text;}
    public void setText(String text){this.text = text;}

    public String getDueDate(){return this.dueDate;}
    public void setDueDate(String dueDate){this.dueDate =dueDate;}

    public String getState(){return this.state;}
    public void setState(String state){this.state =state;}

    public String getdoneDate(){return this.doneDate;}
    public void setDoneDate(String doneDate){this.doneDate =doneDate;}

    public int getPriority(){return this.priority;}
    public void setPriority(int priority){this.priority =priority;}

    public String getcreationDate(){return this.creationDate;}
    public void setCreationDate(String creationDate){this.creationDate =creationDate;}
}