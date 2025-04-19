package com.todolist.listtodo.controller;

import java.util.List;
import java.util.Vector;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.todolist.listtodo.model.TodoModel;
import java.time.LocalDate;

@RestController
@RequestMapping("/todo")
public class TodoService {

    TodoModel item;
    private Vector<TodoModel> todoList = new Vector<TodoModel>();

    private Vector<TodoModel> currentList = new Vector<TodoModel>();

    // Gets
    @GetMapping("/nextPage{page}")
    public Vector<TodoModel> nextPage(int page) {
        Vector<TodoModel> tempPage = new Vector<TodoModel>();
        for (int i = page * 10; i < (page + 1) * 10; i++) {
            if (i >= currentList.size()) {
                return tempPage;
            }
            TodoModel t = currentList.get(i);
            System.out.println(t.getId());
            tempPage.add(t);
        }
        return tempPage;
    }

    
    public Vector<TodoModel> paginatio(int page, Vector<TodoModel> listTodo) {
        System.out.println("Size " + listTodo.size());
        Vector<TodoModel> tempPage = new Vector<TodoModel>();
        for (int i = page * 10; i < (page + 1) * 10; i++) {
            if (i >= listTodo.size()) {
                return tempPage;
            }
            TodoModel t = listTodo.get(i);
            System.out.println("item: " + t.getId());
            tempPage.add(t);
        }
        return tempPage;
    }

    // Gets
    @GetMapping("/getAll{page}")
    public Vector<TodoModel> getAll(int page) {
        currentList = todoList;
        return paginatio(page,todoList);
    }

    @GetMapping("/sort/priority{page}")
    public Vector<TodoModel> sortPriority(int page) {
        Vector<TodoModel> temp = new Vector<TodoModel>(currentList);
        temp.sort((a, b) -> a.getPriority() - b.getPriority());
        System.out.println("Size Temp = " + temp.size());
        return paginatio(page,temp);
    }

    @GetMapping("/sort/state{page}")
    public Vector<TodoModel> sortState(int page) {
        Vector<TodoModel> temp = new Vector<TodoModel>(currentList);
        temp.sort((a, b) -> (a.getState() == "done" ? 1 : 0) - (b.getState() == "done" ? 1 : 0));
        return paginatio(page,temp);
    }

    @GetMapping("/sort/date{page}")
    public Vector<TodoModel> sortDate(int page) {
        Vector<TodoModel> temp = new Vector<TodoModel>(currentList);
        temp.sort((a, b) -> {
            LocalDate dateA = LocalDate.parse(a.getDueDate());
            LocalDate dateB = LocalDate.parse(b.getDueDate());
            return dateA.compareTo(dateB);
        });
        return paginatio(page,temp);
    }

    @GetMapping("/filter/all{page}{priority}{state}{substring}")
    public Vector<TodoModel> filterAll(int page, int priority, String state, String substring) {
        Vector<TodoModel> temp = new Vector<TodoModel>();

        for (int i = 0; i < todoList.size(); i++) {
            boolean priorityFilter = todoList.get(i).getPriority() == priority;
            boolean stateFilter = todoList.get(i).getState().compareTo(state) == 0;
            boolean textFilter = todoList.get(i).getText().contains(substring);
            System.out.println("Priority " + priority + priorityFilter);
            System.out.println("State " + stateFilter);
            System.out.println("Text " + textFilter);

            if ((priority == 0 || priorityFilter) &&
                    (state == "" || stateFilter) &&
                    (substring == "" || textFilter)) {
                temp.add(todoList.get(i));
                System.out.println("Here");
            }
        }
        currentList = temp;
        return paginatio(page,currentList);
    }

    @GetMapping("/filter/priority{page}{priority}")
    public Vector<TodoModel> filterPriority(int page, int priority) {
        Vector<TodoModel> temp = new Vector<TodoModel>();

        for (int i = 0; i < todoList.size(); i++) {
            System.out.println(todoList.get(i).getPriority() + "/" + priority);
            if (todoList.get(i).getPriority() == priority) {
                temp.add(todoList.get(i));
                System.out.println(todoList.get(i).getId());
            }
        }
        currentList = temp;
        return paginatio(page,currentList);
    }

    @GetMapping("/filter/state{page}{state}")
    public Vector<TodoModel> filterState(int page, String state) {
        Vector<TodoModel> temp = new Vector<TodoModel>();

        for (int i = 0; i < todoList.size(); i++) {
            System.out.println(todoList.get(i).getPriority() + "/" + state);
            if (todoList.get(i).getState() == state) {
                temp.add(todoList.get(i));
                System.out.println(todoList.get(i).getId());
            }
        }
        currentList = temp;
        return paginatio(page,currentList);
    }

    @GetMapping("/filter/name{page}{substring}")
    public Vector<TodoModel> filterName(int page, String substring) {
        Vector<TodoModel> temp = new Vector<TodoModel>();

        for (int i = 0; i < todoList.size(); i++) {
            System.out.println(todoList.get(i).getPriority() + "/" + substring);
            if (todoList.get(i).getText().contains(substring)) {
                temp.add(todoList.get(i));
                System.out.println(todoList.get(i).getId());
            }
        }
        currentList = temp;
        return paginatio(page,currentList);
    }

    // Post
    @PostMapping("/create")
    public List<TodoModel> createTodo(@RequestBody TodoModel data) {
        if (data.getText() == null) {
            return todoList;
        }
        if (data.getPriority() == 0) {
            return todoList;
        }
        data.setId(todoList.size());
        todoList.add(data);
        return todoList;
    }

    @PutMapping("/{id}")
    public List<TodoModel> updateTask(@RequestBody TodoModel temp) {
        if (temp.getText() != null) {
            todoList.get(temp.getId()).setText(temp.getText());
        }
        if (temp.getPriority() > 0) {
            todoList.get(temp.getId()).setPriority(temp.getPriority());
        }
        if (temp.getDueDate() != null) {
            todoList.get(temp.getId()).setDueDate(temp.getDueDate());
        }
        return todoList;

    }

  
    @PutMapping("/{id}/delete")
    public List<TodoModel> deleteTask(@PathVariable int id) {
        for(int i = id + 1; i < todoList.size();i++){
            todoList.get(i).setId(i - 1);
        }
        todoList.remove(id);
        return todoList;
    }



    @PutMapping("/{id}/done")
    public List<TodoModel> mark(@PathVariable int id) {
        System.out.println("Done " + id);
        todoList.get(id).setState("done");
        todoList.get(id).setDoneDate(LocalDate.now().toString());
        System.out.println("Id: " + id + "State: " + todoList.get(id).getState() + "Date " + todoList.get(id).getdoneDate());
        return todoList;
    }

    @PutMapping("/{id}/undone")
    public List<TodoModel> unmark(@PathVariable int id) {
        if (id < 0 || id >= todoList.size())
            return todoList;
        todoList.get(id).setState("pending");
        return todoList;
    }

}
