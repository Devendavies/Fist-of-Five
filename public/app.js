'use strict';

$(function(){
  console.log('javascript LOADED!');
  // let socket = io();
  let renderSurveyTemplate = Handlebars.compile($('template#surveys').html());
  let renderUserTemplate = Handlebars.compile($('template#userpage').html());
  let signup_loginTemplate = Handlebars.compile($('template#signup-login').html());
  let newSurveyTemplate = Handlebars.compile($('template#newSurveyTemplate').html());

  let renderForm = function(){
    let formTemplate = signup_loginTemplate();
    $('.results').empty().append(formTemplate);
  };

  let getForms = function(){
    $.ajax({
      url: '/',
      type: 'GET',
    }).done(renderForm)
  };

  getForms();

  let renderSurveys = function(data){
    console.log(data);
    let surveyTemplate = renderSurveyTemplate({survey: data});
    $('.results').empty().append(surveyTemplate);
  };

  let getSurveys = function(e){
    e.preventDefault();
    $.ajax({
      url: '/surveys',
      type: 'GET',
      dataType: 'json'
    }).done(renderSurveys)
  };

  let renderUsers = function(data){
    console.log('render users clicked!')
    console.log(data);
    let userTemplate = renderUserTemplate({user: data});
    $('.results').empty().append(userTemplate);
  };

  let getUsers = function(e){
    e.preventDefault();
    $.ajax({
      url: '/users',
      method: 'GET',
      dataType: 'json'
    }).done(renderUsers)
  };

  let createUser = function(e){
    e.preventDefault();
    alert('User Created! Welcome...')
    // let userData = $(this).closest('form').serialize();
    var userData = {
      name :     $('#new_name').val(),
      password : $('#new_password').val(),
      img_url:   $('#new_profile_pic').val(),
      birthday:  $('#new_birthday').val(),
      bio:       $('#new_bio').val()
    }
    console.log(userData);
    $.ajax({
      url: '/users',
      method: 'POST',
      data: userData,

    }).done();
  };

  let authorize = function(e){
    console.log('login button clicked');
    e.preventDefault();
    var userData = {
      name: $('#login-name').val(),
      password: $('#login-password').val()
    }
    $.ajax({
      url: '/authorization',
      type: 'POST',
      data: userData
    }).done(function(user){
      console.log(user.token);
    });
  };

  let renderSurveyForm = function(e){
    e.preventDefault();
    $('.results').empty().append(newSurveyTemplate);
  }

  let createSurvey = function(e){
    e.preventDefault();
    alert('Survey Created! Lets Poll these Douches');
    var surveyData = {
      topic: $('#new_topic').val(),
      description: $('#new_description').val()
    }
    console.log(surveyData);
    $.ajax({
      url: 'surveys',
      type: 'POST',
      data: surveyData,
    }).done()
  };

//IN PROGRESS...function that adds to vote tally in surveys objects

  let liftFingers = function(){
    var fistList = $('.fist-list li');

    for(var i = 0; i < fistList.length; i++){
      if($('#finger' + i).data('clicked')){
        //need to grab votes data from survey schema and increment it
        //we may need to change the votes names to include numbers so we can iterate instad of writing new function for each
        //deven, since you set up the survey model i thoguht you may have an idea for this
      }
    }
    $.ajax({
      url: '/surveys/:id',
      type: 'PUT',

    }).done()
  };




//body click events
  $('.show_users').on('click', getUsers);
  $('body').on('click', '.show_surveys', getSurveys);
  $('body').on('click', '#signup_button', createUser);
  $('body').on('click', '#login-button', authorize);
  $('body').on('click', '#new-post', renderSurveyForm);
  $('body').on('click', '#create_survey', createSurvey);

//click events for list of vote options

  $('body').on('click', '#finger0', liftFingers);
  $('body').on('click', '#finger1', liftFingers);
  $('body').on('click', '#finger2', liftFingers);
  $('body').on('click', '#finger3', liftFingers);
  $('body').on('click', '#finger4', liftFingers);
  $('body').on('click', '#finger5', liftFingers);



});
