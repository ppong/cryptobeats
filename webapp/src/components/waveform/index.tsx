// copy from https://tchryssos.medium.com/building-an-audio-waveform-progress-bar-with-react-for-quadio-132223928b14

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSetTrackerProgress } from './hooks'
import { filterData, normalizeData } from './processor'

interface IWaveformProps {
    waveform: AudioBuffer
    width: number
}
export const Waveform = (props: IWaveformProps) => {
    const { waveform, width } = props
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const canvasHeight = 56
    const pointWidth = 4
    const pointMargin = 1
    const numSamples = Math.floor(width / (pointWidth + pointMargin))

    const trackDuration = waveform.duration
    const waveformData = useMemo(() => {
        return normalizeData(filterData(waveform, numSamples))
    }, [waveform, numSamples])

    const [trackProgress, setTrackProgress] = useState(0)
    const [startTime, setStartTime] = useState(Date.now())
    const [trackPlaying, setTrackPlaying] = useState(false)
    const [hoverXCoord, setHoverXCoord] = useState<number | undefined>()
    const playingPoint = (trackProgress * width / 100) / (pointWidth + pointMargin)

    const paintWaveform = useCallback(() => {
        paintCanvas({
            canvasRef,
            waveformData,
            canvasHeight,
            pointWidth,
            pointMargin,
            playingPoint,
            hoverXCoord,
        })
    }, [playingPoint])

    useSetTrackerProgress({
        trackProgress, setTrackProgress, trackDuration, startTime,
        trackPlaying
    })

    useEffect(() => {
        if (canvasRef.current) {
            paintWaveform()
        }
    }, [canvasRef])

    useEffect(() => {
        paintWaveform()
    }, [playingPoint])

    const setDefaultX = useCallback(() => {
        setHoverXCoord(undefined)
    }, [])

    const handleMouseMove = useCallback((e) => {
        const canvas = canvasRef.current!
        setHoverXCoord(
            e.clientX - canvas.getBoundingClientRect().left,
        )
    }, [])

    const seekTrack = (e) => {
        const canvas = canvasRef.current!
        const xCoord = e.clientX - canvas.getBoundingClientRect().left
        const seekPerc = xCoord * 100 / width
        const seekMs = trackDuration * seekPerc / 100
        setStartTime(Date.now() - seekMs)
    }

    return (
        <div>
            <canvas
                className=''
                style={{ height: canvasHeight }}
                ref={canvasRef}
                height={canvasHeight}
                width={width}
                onBlur={setDefaultX}
                onMouseOut={setDefaultX}
                onMouseMove={handleMouseMove}
                onClick={seekTrack}
            />
        </div>
    )
}

const pointCoordinates = ({
    index, pointWidth, pointMargin, canvasHeight, amplitude,
}) => {
    const pointHeight = Math.round((amplitude / 100) * canvasHeight)
    const verticalCenter = Math.round((canvasHeight - pointHeight) / 2)
    return [
        index * (pointWidth + pointMargin), // x starting point
        (canvasHeight - pointHeight) - verticalCenter, // y starting point
        pointWidth, // width
        pointHeight, // height
    ]
}

const paintCanvas = ({
    canvasRef, waveformData, canvasHeight, pointWidth, pointMargin,
    playingPoint, hoverXCoord,
}) => {
    const ref = canvasRef.current
    const ctx = ref.getContext('2d')
    // On every canvas update, erase the canvas before painting
    // If you don't do this, you'll end up stacking waveforms and waveform
    // colors on top of each other
    ctx.clearRect(0, 0, ref.width, ref.height)
    waveformData.forEach(
        (p, i) => {
            ctx.beginPath()
            const coordinates = pointCoordinates({
                index: i,
                pointWidth,
                pointMargin,
                canvasHeight,
                amplitude: p,
            })
            ctx.rect(...coordinates)
            const withinHover = hoverXCoord >= coordinates[0]
            const alreadyPlayed = i < playingPoint
            if (withinHover) {
                ctx.fillStyle = alreadyPlayed ? '#ffffff' : '#ffffff'
            } else if (alreadyPlayed) {
                ctx.fillStyle = '#ffffff'
            } else {
                ctx.fillStyle = '#ffffff'
            }
            ctx.fill()
        }
    )
}

