FROM nginx:1.10.2
MAINTAINER Ali Ghanavatian "ghanavatian.ali@gmail.com"

RUN apt-get update -qq && apt-get install curl git -y
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install nodejs -y && apt-get clean && rm -rf /tmp/* /var/tmp/*
RUN curl -sLo /usr/local/bin/ep https://github.com/kreuzwerker/envplate/releases/download/v0.0.8/ep-linux && chmod +x /usr/local/bin/ep
RUN npm install -g create-react-app@1.4.3 serve

RUN cp /etc/nginx/nginx.conf /etc/nginx/nginx.default.conf
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /wwwroot
COPY package.json /wwwroot/package.json
WORKDIR /wwwroot
RUN npm install

COPY . /wwwroot

#ENV REACT_APP_API_ADDRESS https://api.ontimeapp.ir

RUN NODE_ENV=production&&https=true&&CI=true&&npm run build

#ENTRYPOINT [ "/usr/local/bin/ep", "-v", "/etc/nginx/nginx.conf", "--", "/usr/sbin/nginx", "-c", "/etc/nginx/nginx.conf" ]

ENTRYPOINT ["serve", "-p", "80", "-s", "build"]

# docker build . -t thg303/bimo
# docker run --name ot -e 'NGINX_HOST=ot.matnax.com' -e 'VIRTUAL_HOST=ot.matnax.com' -d thg303/bimo
