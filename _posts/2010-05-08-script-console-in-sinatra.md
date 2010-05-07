---
layout: post
title: Interactive console for your Sinatra app
---

Just a simple Rails `script/console` analogue implemented as a rake task:

    require 'myapp' #yours sinatra app

    desc "run irb console"
    task :console, :environment do |t, args|
      #load development environment by default
      ENV['RACK_ENV'] = args[:environment] || 'development'

      exec "irb -r irb/completion -r myapp"
    end

Usage is very simple: `rake console`.
Also you can specify a needed environment with `rake console[test]`.
