$(function(){
	var Todo = Backbone.Model.extend({
		defaults:{
			content:"empty todo...",
			done:false
		},
		initialize: function(){
			if(!this.get("content")){
				this.set({"content":this.defaults.content});
			}
		},
		toggle:function(){
			this.save({done: !this.get("done")});
		},
		clear: function(){
			this.destroy();
		}
	});
	var TodoList = Backbone.Collection.extend({
		model: Todo,
		url:'index.php?s=Index/save',
		done: function(){
			return this.filter(function(todo){return todo.get('done');});
		},
		remaining: function(){
			return this.without.apply(this,this.done());
		},
		nextOrder: function(){
			if(!this.length) return 1;
			console.log(this.last().get('order')+1);
			return this.last().get('order') +1;
		},
		comparator: function(todo){
			return todo.get('order');
		}
	});
	var Todos = new TodoList;
	var TodoView = Backbone.View.extend({
		tagName: "li",
		template:_.template($('#item-template').html()),
		events:{
			"click .check"					:"toggleDone",
			"dblclick label.todo-content"	:"edit",
			"click span.todo-destroy"		:"clear",
			"keypress .todo-input"			:"updateOnEnter",
			"blur .todo-input"				:"close"
		},
		initialize: function() {
	      _.bindAll(this, 'render', 'close', 'remove');
	      this.model.bind('change', this.render);
	      this.model.bind('destroy', this.remove);   //这个remove是view的中的方法，用来清除页面中的dom
    	},
		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));
			this.input = this.$('.todo-input');
			return this;
		},
		toggleDone: function(){
			this.model.toggle();
		},
		edit: function(){
			$(this.el).addClass("editing");
			this.input.focus();
		},
		close:function(){
			this.model.save({content:this.input.val()});
			$(this.el).removeClass("editing");
		},
		updateOnEnter:function(e){
			if(e.keyCode == 13) this.close();
		},
		clear: function(){
			this.model.clear();
		}
	});
	var AppView = Backbone.View.extend({
		el:$("#todoapp"),
		statsTemplate:_.template($('#stats-template').html()),
		events:{
			"keypress #new-todo":"createOnEnter",
			"keyup #new-todo"  :"showTooltip",
			"click .todo-clear a":"clearCompleted",
			"click .mark-all-done":"toggleAllComplete"
		},
		 initialize: function() {
	      //下面这个是underscore库中的方法，用来绑定方法到目前的这个对象中，是为了在以后运行环境中调用当前对象的时候能够找到对象中的这些方法。
	      _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');

	      this.input = this.$("#new-todo");
	      this.allCheckbox = this.$(".mark-all-done")[0];

	      Todos.bind('add',     this.addOne);
	      Todos.bind('reset',   this.addAll);
	      Todos.bind('all',     this.render);

	      Todos.fetch({
	      	url:"index.php?s=Index/fetch"
	      });
		},

		render:function(){
			var done = Todos.done().length;
			var remaining = Todos.remaining().length;
			this.$('#todo-stats').html(this.statsTemplate({
				total: 	Todos.length,
				done:done,
				remaining:remaining
			}));
			this.allCheckbox.checked = !remaining;
		},
		addOne: function(todo){
			var view = new TodoView({model:todo});
			this.$("#todo-list").append(view.render().el);
		},
		addAll: function(){
			Todos.each(this.addOne);
		},
		newAttributes: function(){
			return {
				content: this.input.val(),
				order :Todos.nextOrder(),
				done :false
			};
		},
		createOnEnter: function(e){
			if(e.keyCode != 13) return;
			Todos.create(this.newAttributes());
			this.input.val('');
			 Todos.fetch({
	      	url:"index.php?s=Index/fetch"
	      });
		},
		clearCompleted: function(){
			_.each(Todos.done(),function(todo){todo.clear();});
			return false;
		},
		showTooltip:function(e){
			var tooltip = this.$(".ui-tooltip-top");
			var val = this.input.val();
			tooltip.fadeOut();
			if(this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
			if(val == '' ||val== this.input.attr('placeholder')) return ;
			var show = function(){tooltip.show().fadeIn();};
			this.tooltipTimeout = _.delay(show,1000);
		},
		toggleAllComplete: function(){
			var done = this.allCheckbox.checked;
			Todos.each(function(todo){todo.save({'done':done});});
		}
	});
	var App = new AppView;
});