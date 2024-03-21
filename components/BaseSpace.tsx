import NavBar from '@/components/NavBar'
import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactFlow, {
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    BackgroundVariant,
    ReactFlowProvider,
    ReactFlowInstance,
    Node,
    XYPosition,
} from 'reactflow';
import 'reactflow/dist/style.css';
import AsyncSelect from 'react-select/async';
import MediaDisplay from '@/components/MediaDisplay';
import { ActionMeta, SingleValue } from 'react-select';
const initialNodes: Node[] = [];

interface Option {
    readonly label: string;
    readonly value: string;
}

function BaseSpace() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
    const nodeTypes = useMemo(() => ({ mediaDisplay: MediaDisplay }), []);
    const [userBoards, setUserBoards] = useState<Option[]>([])
    const [value, setValue] = useState<Option | null>();
    const [boardId, setBoardId] = useState<string | null>(null)

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    // Fetch initial board list
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const options = await getBoards(); // this returns an array of options
                setUserBoards(options);
            } catch (error) {
                console.error('Failed to fetch boards:', error);
            }
        };

        fetchBoards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array means this effect runs once on mount
    const loadOptions = useCallback(() => {
        // If there's a case where options need to be fetched asynchronously on demand,
        // you can return a promise here. Otherwise, just return the current state:
        return Promise.resolve(userBoards);
    }, [userBoards]); // Depend on userBoards so it uses the latest state

    async function getBoards(): Promise<any[]> {
        const resp = await axios.get(`/api/list-boards`)
        console.log("boards")
        console.log(resp.data)
        const options = resp.data.boardList.map((data: any) => {
            return {
                value: data.boardId,
                label: data.boardName
            }
        })
        return options
    }
    async function handleSelectChange(newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>): Promise<void> {
        setValue(newValue)
        console.log("new value")
        console.log(newValue)
        //todo get board data

        if (reactFlowInstance && actionMeta.action == "select-option" && newValue?.value) {
            const resp = await axios.post(`/api/get-board`, {
                boardId: newValue.value
            })
            console.log("setting board id")
            console.log(newValue.value)
            setBoardId(newValue.value)
            if (resp.data.boardData && resp.data.boardData !== "") {
                const flow = JSON.parse(resp.data.boardData)
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
            }
            // todo try catch handle error react toast alert
        }
    }
    return (
        <>
            <NavBar />
            <div className="flex flex-col justify-center items-center space-y-4">
                <div className="flex flex-col justify-center items-center w-full max-w-sm space-y-2">
                    <AsyncSelect
                        className="w-full"
                        cacheOptions
                        defaultOptions={true}
                        loadOptions={loadOptions}
                        onChange={handleSelectChange}
                        value={value} />
                    {/* <button onClick={handleCreateBoard} className="btn btn-block">New Board</button> */}
                </div>
                <ReactFlowProvider>
                    <div className="w-[80vw] h-[70vh]" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={(rfInst) => setReactFlowInstance(rfInst)}
                            fitView
                            nodeTypes={nodeTypes}

                        >
                            <Background
                                variant={BackgroundVariant.Cross}
                            />
                            <Controls />
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>
            </div>
        </>
    )
}

export default BaseSpace