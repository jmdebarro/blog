---
title: DNS Sinkhole in C
date: 2026-02-08
description: How a lookup travels from your browser through recursive resolvers, root, TLD and authoritative nameservers, and how I built a sinkhole on a Raspberry Pi.
topics: Networking · C
imageAlt: ASCII diagram of a Raspberry Pi 3 Model B+ seen from above, showing the GPIO header, CPU, USB and Ethernet ports
imageCaption: The Raspberry Pi that runs the sinkhole
layout: post.njk
tags: posts
image: /assets/dnspi.svg
---

## What is DNS?
The Domain Name System (DNS) is an integral part of online systems. It is a how human readable urls (Ex. youtube.com) are mapped to their associated Internet Protocol address (Ex. 142.250.13.201). Every device has an IP address, and DNS lookups allow your device to discover the IP address of given urls.

### How does DNS Work?
The Domain Name System is essentially a large dictionairy. It's purpose is to look up the IP address of a url, and it does this through a variety of ways.

1. A DNS request is first sent to a recursive resolver. This will be the commander of this DNS operation and will not stop working until it is resolved or proven un-resolvable

2. The recursive resolver checks multiple caches for a DNS resolution, we will discuss these later.

3. If the DNS query was not cached, a root nameserver is queried. For a domain like youtube.com, the root domain, '.com', is queried here. We ask the root nameserver, "Who knows how to resolve '.com' IP addresses?". The root nameserver then points us to a Top Level Domain (TLD) nameserver.

4. The TLD nameserver in this example would then know who can resolve 'youtube.com' as this url has the top level domain '.com'. TLD nameservers know where to resolve all top level domains (.com, .edu, .gov, etc...). We would then be pointed to an authoritative nameserver

5. An authoritative nameserver is where IP resolution will occur if the domain is valid. This nameserver is able to return the IP address of the given domain to the recusive resolver, which, in turn, returns the IP address to the web browser.

At this point, HTTP requests can now be made to the IP address so content can be displayed.

Note: For domains like www.debarro.jonathan.dev, an additional nameserver would be required due to the added. .dev would be the TLD, jonathan would be considered the domain, and debarro would be a subdomain. There can be a large amount of subdomains which demand a linear amount of nameserver lookups. 


### What did I do?
