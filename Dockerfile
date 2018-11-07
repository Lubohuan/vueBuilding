FROM nginx:1.10.3
RUN rm -f /usr/share/nginx/html/index.html
RUN mkdir /usr/share/nginx/html/BimScheduleWebsite/
COPY ./dist/ /usr/share/nginx/html/BimScheduleWebsite/