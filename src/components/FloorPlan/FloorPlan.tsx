import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { setSpaces, selectSpace } from 'reducers/spaces'
import { RootState } from 'App';

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
    sceneId: string,
    tickets: any[],
    onSpacesLoaded: any
}

type PropsFromRedux = FloorPlanProps & ConnectedProps<typeof connector>

const FloorPlan = (props: PropsFromRedux) => {

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const container = document.getElementById('floorplan')
        setLoading(true)
        const fp = new FloorPlanEngine(container, floorPlanStartupSettings)
        fp.loadScene(props.sceneId).then(() => {
            props.setSpaces(fp.state.computed.spaces)
            setSpaces(fp.state.computed.spaces)
            setLoading(false)
        })
    }, [props.sceneId]);

    useEffect(() => {
        props.onSpacesLoaded(props.spaces)

        props.spaces.forEach((space: any) => {
            document.getElementById(`el-${space.id}`)?.addEventListener("click", (e: any) => {
                const spaceId = getIdFromEvent(e)
                const space = findSpaceById(spaceId)
                props.selectSpace(space)
            })
        });
    }, [props.spaces])

    useEffect(() => {
        if (props.selectedSpace === null) {
            return
        }
        higlightSpaces()
    }, [props.selectedSpace])

    useEffect(() => {
        if (!props.spaces || !props.tickets) {
            return
        }

        higlightSpaces()

    }, [props.spaces, props.tickets])

    const higlightSpaces = () => {
        props.spaces.forEach((space: any) => {
            const spaceTickets = props.tickets.filter((ticket) => (ticket.spaceId === space.id && ticket.status == 'Open'))
            if (props.selectedSpace !== null && space.id === props.selectedSpace.id) {
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
        return props.spaces.find(space => {
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
