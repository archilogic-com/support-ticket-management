import React, { useEffect, useState } from 'react';
import './FloorPlan.css';

declare var FloorPlanEngine: any

const floorPlanStartupSettings = {
    hideElements: [],
    panZoom: true,
    planRotation: 180,
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
    red: [204, 153, 136],
    green: [177, 204, 136],
    blue: [0, 100, 255],
    lightBlue: [207, 238, 253]
};
const demoSceneId = '415a1828-3aab-4559-a060-55713a1360c8'

interface FloorPlanProps {
    spaceSelected: any
    onSpaceSelected: any
}
const FloorPlan = (props: FloorPlanProps) => {

    const [spaces, setSpaces] = useState<any[]>([])
    const [spaceSelected, setSpaceSelected] = useState<any>(undefined)

    useEffect(() => {
        const container = document.getElementById('floorplan')

        const fp = new FloorPlanEngine(container, floorPlanStartupSettings)
        fp.loadScene(demoSceneId).then(() => {
            setSpaces(fp.state.computed.spaces)
        })
    }, []);

    useEffect(() => {
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
        clearSpacesColor()

        fillSpaceWithColor(props.spaceSelected.id, colorMap['lightBlue'])
    }, [props.spaceSelected])

    const clearSpacesColor = () => {
        spaces.forEach((space: any) => {
            space.node.setHighlight({
                fill: undefined
            });
        });
    }

    const findSpaceById = (id: string) => {
        return spaces.find(space => {
            return space.id === id
        })
    }

    const fillSpaceWithColor = (spaceId: string, color?: number[]) => {
        const space: any = findSpaceById(spaceId)
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