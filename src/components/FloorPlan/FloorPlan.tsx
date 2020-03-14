import React, { useEffect, useState } from 'react';
import './FloorPlan.css';

declare var FloorPlanEngine: any

const floorPlanStartupSettings = {
    hideElements: [],
    panZoom: true,
    planRotation: null,
    roomStampSize: null,
    ui: {
        menu: false,
        scale: false,
        coordinates: false
    },
    theme: {
        background: {
            color: '#f3f5f8',
            showGrid: false
        },
        wallContours: false,
        elements: {
            roomstamp: { showArea: false }
        }
    },
    units: {
        system: 'metric',
        digits: 0,
        roomDimensions: 'area'
    }
}

const colorMap = {
    red: [227, 108, 100],
    green: [177, 204, 136],
    blue: [0, 100, 255],
    lightBlue: [207, 238, 253]
};

interface FloorPlanProps {
    spaceSelected: any
    onSpaceSelected: any,
    sceneId: string,
    tickets: any[],
    onSpacesLoaded: any
}

const FloorPlan = (props: FloorPlanProps) => {

    const [spaces, setSpaces] = useState<any[]>([])

    useEffect(() => {
        const container = document.getElementById('floorplan')

        const fp = new FloorPlanEngine(container, floorPlanStartupSettings)
        fp.loadScene(props.sceneId).then(() => {
            setSpaces(fp.state.computed.spaces)
        })
    }, [props.sceneId]);

    useEffect(() => {
        props.onSpacesLoaded(spaces)
        spaces.forEach((space: any) => {
            document.getElementById(`el-${space.id}`)?.addEventListener("click", (e: any) => {
                const spaceId = getIdFromEvent(e)
                const space = findSpaceById(spaceId)
                props.onSpaceSelected(space)
            })
        });
    }, [spaces])

    useEffect(() => {
        if (props.spaceSelected === undefined) {
            return
        }
        higlightSpaces()
    }, [props.spaceSelected])

    useEffect(() => {
        if (!spaces || !props.tickets) {
            return
        }

        higlightSpaces()

    }, [spaces, props.tickets])

    const higlightSpaces = () => {
        spaces.forEach((space: any) => {
            const spaceTickets = props.tickets.filter((ticket) => (ticket.spaceId === space.id && ticket.status == 'Open'))
            if (props.spaceSelected !== undefined && space.id === props.spaceSelected.id) {
                fillSpaceWithColor(space, colorMap['lightBlue'])
                return
            }

            if (spaceTickets.length > 0) {
                fillSpaceWithColor(space, colorMap['red'])
                return
            }

            fillSpaceWithColor(space, undefined)

        })
    }


    const findSpaceById = (id: string) => {
        return spaces.find(space => {
            return space.id === id
        })
    }


    const fillSpaceWithColor = (space: any, color?: number[]) => {
        if (space === undefined) {
            return
        }
        space.node.setHighlight({
            fill: color
        });
    }

    const getIdFromEvent = (e: any) => {
        return e.currentTarget.id.replace('el-', '')
    }

    return (
        <div id="floorplan" style={{ height: '100%', width: '100%' }}></div>
    )

}

export default FloorPlan;