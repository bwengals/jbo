

## webrtc?
something

WebRTC (real time communications) looks like a nice way for browsers to send
info to each other directly, without flowing through your server. From
what I understand this looks somewhat like this...


     Alice --><-- video/audio --><-- Bob  (Their browsers)
      \                               /
       \                             /
        \                           /
         \--><--signal server--><--/      (Ours)
                     ^
                     |
                     |
                  endpoints
                     ^
                     |
                     |
                website server           (Ours)


Our website first sends the endpoints (Alice and Bob) to a signaling server.
There are some free test signaling ones out there we can use to start.  One I
saw had a max of 100 connections (Alice and Bob's) and pay to use more.  I saw
some implementations we can run ourselves later.  The signaling server then
initializes a connection between Alice and Bob and passes back metadata type
info (bandwidth available, video info, are you still there's etc.).  Maybe
there are issues with NAT's and firewalls? and you need these things called
STUN/TURN servers whatever those are.  Once that is set up, WebRTC takes over,
acting as an abstraction layer dealing with audio/video/filetranfser, different
browsers, camera hardware and all that.  WebRTC does not specify the signaling
protocol.

This is nice because the video between users doesn't all need to go through our
server.


### WebRTC

- [homepage](https://webrtc.org/)
- [wikipedia](https://en.wikipedia.org/wiki/WebRTC)
- [how-to](https://codelabs.developers.google.com/codelabs/webrtc-web/#0)
- [SimpleWebRTC](https://github.com/andyet/SimpleWebRTC)
- [Samples](https://github.com/webrtc/samples)

### Signaling servers
- [SaltyRTC](https://saltyrtc.org/)



