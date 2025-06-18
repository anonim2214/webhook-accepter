'use client'

import React from "react";
import {useEffect, useRef, useState} from "react";
import {allExpanded, darkStyles, JsonView} from "react-json-view-lite";
import 'react-json-view-lite/dist/index.css';

export default function Home() {

    const [values, setValues] = useState<any[]>([]);
    const timerRef = useRef(null);

    const getData = () => {
        fetch('/api').then(e => {
            e.json().then(eee => {
                console.log(eee)
                setValues(eee.webHooks);
            })
        })
    }

    useEffect(() => {
        getData();
        // @ts-ignore
        timerRef.current = setInterval(() => {
            getData();
        }, 1000 * 2);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, []);

  return (
    <div className="grid" style={{ gridTemplateColumns: "200px 200px minmax(0, 1fr)", rowGap: "20px" }}>
      <div className="text-center">Time</div>
      <div className="text-center">From</div>
      <div className="text-center">Body</div>
        {values.map((e, index) => (
            <React.Fragment key={e.timestamp}>
                <div className="text-center">{new Date(e.timestamp).toLocaleTimeString()}</div>
                <div className="text-center">{e.title}</div>
                <div className="relative">
                    <JsonView data={e.body} shouldExpandNode={allExpanded} style={darkStyles} />
                    <button onClick={() => {
                        fetch('/api', {
                            method: 'DELETE', headers: {
                                index: index.toString(),
                            }
                        }).then(e => {
                            getData();
                        })
                    }} className="absolute p-5 top-0 right-0">Delete</button>
                </div>
            </React.Fragment>
        ))}
    </div>
  );
}
