import React, { useState, useEffect } from 'react';
import './sidebarLeft.css';
import Sidebar from '../Sidebar/Sidebar';

const SidebarLeft = ({ map, properties }) => {

    const [leftElem, setLeftElem] = useState(null);

    useEffect(() => {
        if (map) {
            setLeftElem(document.getElementById('left'));
        }
    }, [map]) // this diff is necessary

    const toggleSidebar = () => {
        if (!leftElem) return;

        var classes = leftElem.className.split(' ');
        const collapsed = classes.indexOf('collapsed') !== -1;

        var padding = {};

        if (collapsed) {
            // Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
            classes.splice(classes.indexOf('collapsed'), 1);
        } else {
            // Add the 'collapsed' class to the class list of the element
            classes.push('collapsed');
        }

        // Update the class list on the element
        leftElem.className = classes.join(' ');

    };
    const propsPanel = (props) => (
        <div >
            {
                Object.entries(props).map(([key, val]) =>
                    <div key={key}>{key}: {val}</div>
                )
            }
        </div>

    )

    return (
        <div>
            <div id="left" className="sidebar flex-center left collapsed">
                <div className="sidebar-content rounded-rect flex-center">
                    <div>
                        <div>
                            <h1>Info</h1>
                            {properties && propsPanel(properties)}
                        </div>
                        <Sidebar />
                    </div>

                    <div
                        className="sidebar-toggle rounded-rect left"
                        onClick={toggleSidebar}
                    >
                        {'->'}
                    </div>
                </div>
            </div>

        </div>
    )
};

export default SidebarLeft;