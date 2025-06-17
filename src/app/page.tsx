'use client'

import React from "react";
import {useEffect, useRef, useState} from "react";
import {allExpanded, darkStyles, JsonView} from "react-json-view-lite";
import 'react-json-view-lite/dist/index.css';

export default function Home() {

    const [values, setValues] = useState<any[]>([]);
    const timerRef = useRef(null);

    useEffect(() => {
        // @ts-ignore
        timerRef.current = setInterval(() => {
            fetch('/api').then(e => {
                e.json().then(eee => {
                    console.log(eee)
                    setValues(eee.webHooks);
                })
            })
        }, 1000 * 2);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, []);

  return (
    <div className="grid grid-cols-3" style={{ gridTemplateColumns: "200px minmax(0, 1fr)", rowGap: "20px" }}>
      <div className="text-center">Time</div>
      <div className="text-center">Body</div>
        {values.map(e => (
            <React.Fragment key={e.timestamp}>
                <div className="text-center">{new Date(e.timestamp).toLocaleTimeString()}</div>
                <div className="">
                    <JsonView data={e.body} shouldExpandNode={allExpanded} style={darkStyles} />
                </div>
            </React.Fragment>
        ))}
    </div>
  );
}
