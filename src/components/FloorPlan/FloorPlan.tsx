import { RootState } from 'App';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectSpace, setSpaces } from 'reducers/spaces';
import './FloorPlan.css';


declare var FloorPlanEngine: any

const floorPlanStartupSettings = {
    hideElements: [],
    panZoom: true,
    planRotation: 0,
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
    gold: [250, 173, 20]
};

interface FloorPlanProps {
    sceneId: string,
    tickets: any[],
    onSpacesLoaded: any
}

type PropsFromRedux = FloorPlanProps & ConnectedProps<typeof connector>

const FloorPlan = (props: PropsFromRedux) => {


    useEffect(() => {
        const container = document.getElementById('floorplan')
        const fp = new FloorPlanEngine(container, floorPlanStartupSettings)
        fp.loadScene(props.sceneId).then(() => {
            props.setSpaces(fp.resources.spaces)
            props.onSpacesLoaded(fp.resources.spaces)
            fp.on('click', (event: any) => onRoomClick(event, fp));

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sceneId]);

    useEffect(() => {
        higlightSpaces()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedSpace])

    useEffect(() => {
        if (!props.spaces && !props.tickets) {
            return
        }

        higlightSpaces()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.spaces, props.tickets])

    const onRoomClick = (event: any, floorPlan: any) => {
        const { spaces } = floorPlan.getResourcesFromPosition(event.pos);
        if (spaces.length === 0) return;

        props.selectSpace(spaces[0]);
    }


    const higlightSpaces = () => {
        props.spaces.forEach((space: any) => {
            const spaceTickets = props.tickets.filter((ticket) => (ticket.spaceId === space.id && ticket.status === 'Open'))
            if (props.selectedSpace !== null && space.id === props.selectedSpace.id) {
                fillSpaceWithColor(space, colorMap['gold'])
                return
            }

            if (spaceTickets.length > 0) {
                fillSpaceWithColor(space, colorMap['red'])
                return
            }

            fillSpaceWithColor(space, undefined)

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

    return (<div id="floorplan" style={{ height: '100%', width: '100%' }}></div>)

}

const mapState = (state: RootState) => ({
    spaces: state.spaces.spaces,
    selectedSpace: state.spaces.selectedSpace
})

const mapDispatch = {
    setSpaces,
    selectSpace
}

const connector = connect(mapState, mapDispatch)
export default connector(FloorPlan);
