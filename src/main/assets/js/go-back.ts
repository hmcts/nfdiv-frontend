import $ from 'jquery';

$('.govuk-back-link').click(e => {
  e.preventDefault();
  history.go(-1);
});

