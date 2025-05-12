import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'react-router-dom';
import { byyutoTheme } from './theme';
import router from './navigation/Routes';
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



export default function App() {

  const queryClient = new QueryClient()

  return (
     <QueryClientProvider client={queryClient}>
      <MantineProvider theme={byyutoTheme}  >
         <Notifications />
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
