import { useEffect, useState } from 'react';
import { useGetReceiversMutation, useGetMessagesMutation, useSendMessageMutation } from '../../slices/resortAdminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { IMessage } from '@/types/types';
import { io, Socket } from 'socket.io-client'


const Chats: React.FC = () => {
    const { resortAdmin } = useSelector((state: RootState) => state.auth)
    const [rececivers, setReceivers] = useState<{ id: string, name: string, avatar: string | undefined }[]>()
    const [messages, setMessages] = useState<IMessage[]>([])
    const [newMessageTxt, setNewMessageTxt] = useState<string>('')
    const [getReceivers] = useGetReceiversMutation()
    const [getMessages] = useGetMessagesMutation()
    const [sendMessage] = useSendMessageMutation()
    const [active, setActive] = useState<string>('')
    // const dispatch = useDispatch<AppDispatch>()

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:7000', {
            query: { userId: resortAdmin?._id },
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to socket:', newSocket.id);
        });

        newSocket.on('receiveMessage', (message: IMessage) => {
            
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            newSocket.disconnect();
            setSocket(null)
        };
    }, [resortAdmin]);

    useEffect(() => {
        (async function () {
            try {
                const res = await getReceivers().unwrap()
                const transformedReceivers = res.map((conversation) => {
                    const user = conversation.participants.find(
                        (participant) => participant.participantType === 'User'
                    );
                    return {
                        id: typeof user!.participantId !== 'string' && 'name' in user!.participantId
                            ? user!.participantId._id : '',
                        name: typeof user!.participantId !== 'string' && 'name' in user!.participantId
                            ? user!.participantId.name : '',
                        avatar: typeof user!.participantId !== 'string' && 'avatar' in user!.participantId
                            ? user!.participantId.avatar : '',
                    };
                });

                setReceivers(transformedReceivers)
            } catch (err) {
                console.log(err)
            }

        })()
    }, [])

    const findChat = async (id: string) => {
        try {
            const conversation = await getMessages(id).unwrap()
            setActive(id)
            setMessages(conversation.messages)
        } catch (err) {
            console.log(err)
        }
    }

    const sendMessageHandler = async () => {
        try {
            const res = await sendMessage({
                senderId: resortAdmin?._id!,
                senderType: 'Resort',
                receiverId: active,
                receiverType: 'User',
                message: newMessageTxt,
            }).unwrap()
            if (res) {
                setMessages((prevMessages) => [...prevMessages, res]);
                setNewMessageTxt('');
                socket?.emit('sendMessage', res);
            }
        } catch (err) {
            console.log(err);
        }
    }

        return (
            <>
                <div className="flex h-screen pt-16 w-11/12">
                    <aside className="w-1/4 bg-white border-x border-blue-300">

                        <ul className="py-4 space-y-1">
                            {rececivers?.length && rececivers.map((conversation) => (
                                <li
                                    key={conversation.id}
                                    className={`${active == conversation.id ? "bg-blue-300" : "bg-blue-50"} p-3 flex items-center  hover:bg-blue-300 cursor-pointer text-blue-800 font-medium`}
                                    onClick={() => findChat(conversation.id)}
                                >
                                    <img className='w-8 rounded-full mr-2' src={conversation.avatar} />
                                    {conversation.name}
                                </li>
                            ))}
                        </ul>
                    </aside>


                    <div className="flex-1 flex flex-col">

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                            {messages.length ? messages.map((message) => (
                                <div
                                    key={message._id}
                                    className={`max-w-xs p-3 rounded-lg text-white font-medium shadow-md ${message.senderType === 'Resort'
                                        ? 'bg-blue-700 place-self-end'
                                        : 'bg-blue-500 place-self-start'
                                        }`}
                                >
                                    {message.message}
                                </div>
                            )) : (
                                <div className="w-full">
                                    <p className="text-2xl text-center mt-32">No chats</p>
                                </div>
                            )}
                        </div>


                        {active != '' && (<div className="p-4 bg-blue-100 border-t border-blue-300 flex items-center space-x-2">
                            <input
                                type="text"
                                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none  bg-white text-blue-800 placeholder-blue-600"
                                placeholder="Type a message..."
                                value={newMessageTxt}
                                onChange={(e) => setNewMessageTxt(e.target.value)}
                            />
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400 font-medium"
                                onClick={sendMessageHandler}
                                type="button"
                            >
                                Send
                            </button>
                        </div>)}
                    </div>
                </div>
            </>
        );
    };

    export default Chats;
