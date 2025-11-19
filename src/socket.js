'use client';

import { io } from "socket.io-client";

const SOCKET_IO_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SOCKET_IO_URL : '';

export const socket = io(SOCKET_IO_URL);