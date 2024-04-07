import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import HomePage from './pages/HomePage'
import Signup from './components/Signup'
import CourseCreate from './pages/CourseCreate';
import DisplaySingleCourse from './pages/DisplaySingleCourse';
import ParentPage from './pages/ParentPage'
import TeacherPage from './pages/TeacherPage'
import JoinCourse from './pages/JoinCourse';
import Forum from './components/Forum';
import CreateForum from './components/createForum';
import ReplyForum from './components/forumReply';
import Webinars from './components/webinars';
import WebinarsCreate from './components/webinarsCreate';
import Resources from './components/Resources';

import SimonGame from './pages/SimonGame';
import QuestionPage from './pages/QuestionPage';
import WordPage from './pages/WordPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import Chat from './components/Chat';
import BlogCreate from './components/blogCreate';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Games from './pages/Games';
import Quiz from './pages/Quiz';
import DiaplayParentSinglePage from './pages/DiaplayParentSinglePage';
import WordGamePage from './pages/WordGamePage';
import QuizPage from './pages/QuizPage';
import About from './components/About';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/createCourse' element={<CourseCreate />} />
            {/* for teacher */}
            <Route path='/displaySingleCourse/:id' element={<DisplaySingleCourse />} />
            <Route path='/join-course' element={<JoinCourse />} />
            <Route path='/TeacherPage' element={<TeacherPage />} />
            <Route path='/ParentPage' element={<ParentPage />} />
            <Route path='/ParentPage' element={<ParentPage />} />
            <Route path='/displaySingleCourseForParent/:id' element={<DiaplayParentSinglePage />} />
            <Route path='/createCourse' element={<CourseCreate />} />
            <Route path='/join-course' element={<JoinCourse />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/createForum" element={<CreateForum />} />
          <Route path="/forum/reply/:id" element={<ReplyForum />} />
          <Route path="/simongame" element={<SimonGame />} />
          <Route path="/games/:courseId" element={<Games />} />
          <Route path="/publishQuestion/:courseId" element={<QuestionPage />} />
          <Route path="/publishWord/:courseId" element={<WordPage />} />
          <Route path="/playgame/:wordId" element={<WordGamePage />} />
          <Route path="/quiz/:courseId" element={<Quiz />} />
          <Route path="/quizpage/:courseId" element={<QuizPage />} />
          <Route path="/publishQuestion" element={<QuestionPage />} />
          <Route path="/publishWord" element={<WordPage />} />
          <Route path="/about" element={<About />} />

        <Route path='/TeacherPage' element={<TeacherPage />}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route path='/createCourse' element={<CourseCreate />} />
        <Route path='/displaySingleCourse/:id' element={<DisplaySingleCourse />} />
        <Route path='/join-course' element={<JoinCourse />} />


        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/createForum" element={<CreateForum />} />
        <Route path="/forum/reply/:id" element={<ReplyForum />} />
        <Route path="/simongame" element={<SimonGame />}/>
        <Route path="/publishQuestion" element={<QuestionPage />}/>
        <Route path="/publishWord" element={<WordPage />}/>

        <Route path="/webinar" element={<Webinars />} />
        <Route path="/webinar/create" element={<WebinarsCreate />} />

        <Route path="/resource" element={<Resources />} />
        <Route path="/chat" element={<Chat />} />
        <Route path='/createblog' element={<BlogCreate />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App