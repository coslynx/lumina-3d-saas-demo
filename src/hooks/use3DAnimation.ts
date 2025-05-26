import { useEffect, useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

interface Use3DAnimationProps {
    timeline: gsap.core.Timeline | null;
    autoplay?: boolean;
    onUpdate?: () => void;
	onStart?: () => void;
	onComplete?: () => void;
    enabled?: boolean;
}

interface Use3DAnimationResult {
    play: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    reverse: () => void;
    progress: gsap.core.PropTween<number> | undefined;
	timeScale: (value: number) => void;
}

function use3DAnimation(props: Use3DAnimationProps): Use3DAnimationResult {
    const { 
        timeline: initialTimeline, 
        autoplay = false, 
        onUpdate,
		onStart,
		onComplete,
        enabled = true
    } = props;

    const [progress, setProgress] = useState<number>(0);
    const timelineRef = useRef<gsap.core.Timeline | null>(initialTimeline || null);
    const isPlayingRef = useRef(false);

    useEffect(() => {
        timelineRef.current = initialTimeline || null;

		if (timelineRef.current) {
			timelineRef.current.eventCallback("onUpdate", () => {
				if (onUpdate) {
					onUpdate();
				}
				setProgress(timelineRef.current ? timelineRef.current.progress() : 0);
			});

			timelineRef.current.eventCallback("onStart", () => {
				if (onStart) {
					onStart();
				}
				isPlayingRef.current = true;
			});

			timelineRef.current.eventCallback("onComplete", () => {
				isPlayingRef.current = false;
				if (onComplete) {
					onComplete();
				}
			});
		}

        if (autoplay && initialTimeline && enabled) {
            initialTimeline.play();
            isPlayingRef.current = true;
        }

        return () => {
			if (timelineRef.current) {
				timelineRef.current.pause();
				timelineRef.current.eventCallback("onUpdate", null);
				timelineRef.current.eventCallback("onStart", null);
				timelineRef.current.eventCallback("onComplete", null);
			}
        };
    }, [initialTimeline, autoplay, onUpdate, onStart, onComplete, enabled]);

    useFrame(() => {
        if (timelineRef.current && isPlayingRef.current && enabled) {
            timelineRef.current.progress();
        }
    });

    const play = useCallback(() => {
        if (timelineRef.current && enabled) {
            timelineRef.current.play();
            isPlayingRef.current = true;
        }
    }, [enabled]);

    const pause = useCallback(() => {
        if (timelineRef.current) {
            timelineRef.current.pause();
            isPlayingRef.current = false;
        }
    }, []);

    const resume = useCallback(() => {
        if (timelineRef.current && enabled) {
            timelineRef.current.resume();
            isPlayingRef.current = true;
        }
    }, [enabled]);

    const stop = useCallback(() => {
        if (timelineRef.current) {
            timelineRef.current.restart().pause();
            isPlayingRef.current = false;
			setProgress(0);
        }
    }, []);

    const reverse = useCallback(() => {
        if (timelineRef.current && enabled) {
            timelineRef.current.reverse();
            isPlayingRef.current = true;
        }
    }, [enabled]);

	const timeScale = useCallback((value: number) => {
		if (timelineRef.current) {
			timelineRef.current.timeScale(value);
		}
	}, []);

    return {
        play,
        pause,
        resume,
        stop,
        reverse,
        progress: timelineRef.current?.progress(),
		timeScale,
    };
}

export { use3DAnimation };