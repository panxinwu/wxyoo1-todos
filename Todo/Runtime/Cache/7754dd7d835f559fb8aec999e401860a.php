<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>

  <head>
    <title>the5fire-Backbone.js-todos</title>
    <link href="__ROOT__/Todo/Tpl/Index/css/todos.css" media="all" rel="stylesheet" type="text/css"/>
    <script src="__ROOT__/Todo/Tpl/Index/js/json2.js"></script>
    <script src="__ROOT__/Todo/Tpl/Index/js/jquery-1.6.4.min.js"></script>
    <script src="__ROOT__/Todo/Tpl/Index/js/underscore-min.js"></script>
    <script src="__ROOT__/Todo/Tpl/Index/js/backbone.js"></script>
    <script src="__ROOT__/Todo/Tpl/Index/js/todos.js"></script>
  </head>

  <body>

    <!-- Todo App Interface -->

    <div id="todoapp">
      <div class="title">
        <h1>Todos</h1>
      </div>
      <div class="content">
        <div id="create-todo">
          <input id="new-todo" placeholder="What needs to be done?" type="text" />
          <span class="ui-tooltip-top" style="display:none;">Press Enter to save this task</span>
        </div>
        <div id="todos">
          <input class="check mark-all-done" type="checkbox"/>
          <label for="check-all">Mark all as complete</label>
          <ul id="todo-list"></ul>
        </div>
        <div id="todo-stats"></div>
      </div>
    </div>

    <!-- Templates -->
    <script type="text/template" id="item-template">
      <div class="todo <%= done ? 'done' : '' %>">
        <div class="display">
          <input class="check" type="checkbox" <%= done ? 'checked="checked"' : '' %> />
          <label class="todo-content"><%= content %></label>
          <span class="todo-destroy"></span>
        </div>
        <div class="edit">
          <input class="todo-input" type="text" value="<%= content %>" />
        </div>
      </div>
    </script>

    <script type="text/template" id="stats-template">
      <% if (total) { %>
        <span class="todo-count">
          <span class="number"><%= remaining %></span>
          <span class="word"><%= remaining == 1 ? 'item' : 'items' %></span> left.
        </span>
      <% } %>
      <% if (done) { %>
        <span class="todo-clear">
          <a href="#">
            Clear <span class="number-done"><%= done %></span>
            completed <span class="word-done"><%= done == 1 ? 'item' : 'items' %></span>
          </a>
        </span>
      <% } %>
    </script>

  </body>

</html>