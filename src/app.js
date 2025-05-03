import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());

// import all routers here
import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import certificateRouter from './routes/certificate.route.js';
import commentRouter from './routes/comment.route.js';
import courseRouter from './routes/course.route.js';
import enrollmentRouter from './routes/enrollement.route.js';
import invoiceRouter from './routes/invoice.route.js';
import lessonRouter from './routes/lesson.route.js';
import lessonResourceRouter from './routes/lessonResourse.route.js';
import moduleRouter from './routes/module.route.js';
import paymentRouter from './routes/payment.route.js';
import profileRouter from './routes/profile.route.js';
import tweetRouter from './routes/tweet.route.js';

// use all routers here
app.use('/api/v1/user', userRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/certificate', certificateRouter);
app.use('/api/v1/comment', commentRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/enrollment', enrollmentRouter);
app.use('/api/v1/invoice', invoiceRouter);
app.use('/api/v1/lesson', lessonRouter);
app.use('/api/v1/lesson-resource', lessonResourceRouter);
app.use('/api/v1/module', moduleRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/tweet', tweetRouter);

export { app };