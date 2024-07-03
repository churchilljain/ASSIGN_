import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';
import DepartmentList from './DList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'body', headerName: 'Body', width: 250 },
];

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5  });

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid 
          rows={posts} 
          columns={columns} 
          paginationModel={paginationModel} 
          onPaginationModelChange={(model) => setPaginationModel(model)}
        />
      </div>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;

