import React, { useRef, useState, useEffect} from 'react';
import "./Biceps.css";
import * as tf from "@tensorflow/tfjs";
import * as posenet from '@tensorflow-models/posenet';
import Webcam from "react-webcam";
import Navbar from "./Navbar.js";

import { drawKeypoints, drawSkeleton } from "./utilities";


function Shoulder () {
    
        const webcamRef= useRef(null);
        const canvasRef = useRef(null);
        const [angle, setAngle] = useState(null);
        const [status, setStatus] = useState('Calculating...');
        const [counter, setCounter] = useState(0);

        const [isDetecting, setIsDetecting] = useState(false);


        function calculateAngle(a, b, c) {
            a = [a.x, a.y]; // First
            b = [b.x, b.y]; // Mid
            c = [c.x, c.y]; // End
        
            const radians = Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
            let calculatedAngle = Math.abs((radians * 180.0) / Math.PI);
        
            if (calculatedAngle > 180.0) {
              calculatedAngle = 360 - calculatedAngle;
            }
        
            return calculatedAngle;
          }


          useEffect(() => {
            if (angle > 150) {
              setStatus('down');
            }
            if (angle < 30 && status === 'down') {
              setStatus('up');
              setCounter(counter + 1);
              console.log(counter);
            }
            if (angle < 18) {
              setStatus('good');
            } else {
              setStatus('error');
              console.log(status);
              const status1 = 'WARNING: Keep your elbow closer';
              console.log(status1);
            }
          }, [angle, status, counter]);
        //load posenet


      
        const runPosenet = async () =>{
            const net = await posenet.load({

                inputResolution:{width:640, height:480},
                scale:0.5,
            });

            setInterval(() =>{
                detect(net);
                
            },100);
        };

         
        const detect = async (net) => {

            if( typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4){
                    

                    //getvedio props

                    const video = webcamRef.current.video;
                    const videoWidth = webcamRef.current.video.videoWidth;
                    const videoHeight = webcamRef.current.video.videoHeight;

                    webcamRef.current.video.width = videoWidth;
                    webcamRef.current.video.height= videoHeight;

                    //make detection

                    const pose = await net.estimateSinglePose(video);
                    //console.log(pose);
                   /* pose.keypoints.forEach((keypoint) => {
                        const { x, y } = keypoint.position;
                        console.log(`Keypoint ${keypoint.part} - X: ${x}, Y: ${y}`);

                      });*/
                      const hipKeypoint = pose.keypoints.find((keypoint) => keypoint.part === 'rightHip');
                      const shoulderKeypoint = pose.keypoints.find((keypoint) => keypoint.part === 'rightShoulder');
                      const elbowKeypoint = pose.keypoints.find((keypoint) => keypoint.part === 'rightElbow');

                      if (hipKeypoint && shoulderKeypoint &&  elbowKeypoint) {
                        const hip = hipKeypoint.position;
                        const shoulder = shoulderKeypoint.position;
                        const elbow = elbowKeypoint.position;
                  
                        // Calculate the angle
                        const calculatedAngle= calculateAngle(hip, shoulder, elbow);
                        setAngle(calculatedAngle);
                        
                        //console.log(`Angle: ${angle}`);
                      } //else {
                       // console.log('One or more keypoints not found in the pose estimation result.');
                      //}



                     /*if (hipKeypoint) {
                        const { x, y } = hipKeypoint.position;
                        console.log(`rightHip - X: ${x}, Y: ${y}`);
                        // You can use the x and y coordinates of the nose keypoint here
                      } else {
                        console.log('Nose keypoint not found in the pose estimation result.');
                      }*/

                   drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);


                }
        


        };
        const handleDetectClick = () => {
          setIsDetecting(true);
          detectPosenet(); // Call the detectPosenet function
        };

        const detectPosenet = async () => {
          const net = await posenet.load({
            inputResolution: { width: 640, height: 480 },
            scale: 0.5,
          });
      
      
          setIsDetecting(false); // Reset isDetecting when detection is complete
        };

       const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
            const ctx = canvas.current.getContext("2d");
            canvas.current.width = videoWidth;
            canvas.current.height = videoHeight;
        
            drawKeypoints(pose["keypoints"], 0.6, ctx);
            drawSkeleton(pose["keypoints"], 0.7, ctx);
          };

        runPosenet();
    

        return (
          <div className="main">
            <Navbar />
            <div className="Biceps">
              <div className="camera-container">
                <Webcam
                  ref={webcamRef}
                  id="webcam-video"
                />
                <canvas
                  ref={canvasRef}
                  id="pose-canvas"
                  width={640}
                  height={480}
                />
              </div>
              <div className="button">
                <button onClick={handleDetectClick} disabled={isDetecting}>
                  {isDetecting ? 'Detecting...' : 'Start Detection'}
                </button>
                <div className="angle">
                  <p className="bold-italic">Angle: {angle !== null ? angle.toFixed(2) : 'Calculating...'} degrees</p>
                  <p className="bold-italic">Status: {status}</p>
                  <p className="bold-italic">Counter: {counter}</p>
                </div>
              </div>
            </div>
          </div>
        );
        
        
      }
      
      export default Shoulder;
      
      
      
      
      
      