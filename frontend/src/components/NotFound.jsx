import { useEffect } from 'react';

function NotFound () {

    useEffect(() => {
        document.title = 'Notes App | 404 - Not Found';
      }, []);

    return (
    <div style={{color: 'white'}}>Not Found</div>
);
}

export default NotFound;