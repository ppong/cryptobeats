import { Track } from '../context/application'

export function getTracksFromCollectibles(collectibles: any): Promise<Track[]> {
    const promises: Promise<any>[] = collectibles.map((collectible) => {
        return fetch(collectible.metadataURI).then((res) => res.json())
    })
    return Promise.all(promises).then((rawMetadata) => {
        const tracks: Track[] = rawMetadata.map((metadata, index) => {
            return {
                albumCoverUrl: metadata.body?.artwork?.info?.uri,
                artist: metadata.body?.artist,
                description: metadata.body?.notes,
                title: metadata.body?.title,
                duration: metadata.boyd?.duration,
                mediaUrl: collectibles[index].contentURI
            }
        })
        return tracks.filter((track) => {
            return track.albumCoverUrl && track.mediaUrl && track.title !== 'Marcel Oneil'
        })
    })
}
