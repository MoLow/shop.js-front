import $ from 'jquery';
import './jquery-validate.min';
import '../css/main.css';
import {controller, view as signup} from './signup.file';
import login from '../src/login.html';
import reset from '../src/reset.html';
import restore from '../src/restore.html';

const backdrop = $(".backdrop");
const sideDrawer = $(".mobile-nav");
const menuToggle = $("#side-menu-toggle");

backdrop.on("click", function() {
  $(this).hide();
  sideDrawer.removeClass("open");
});

menuToggle.on("click", function() {
  backdrop.show();
  sideDrawer.addClass("open");
});

$("main").html(signup);
controller();