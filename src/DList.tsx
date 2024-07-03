import React, { useState } from 'react';
import { Container, Checkbox, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const departments = [
  {
    name: "Engineering",
    subDepartments: ["Software", "Hardware"]
  },
  {
    name: "Human Resources",
    subDepartments: ["Recruitment", "Operations"]
  },
  {
    name: "Agriculture and fishing",
    subDepartments: ["Agriculture", "crop", "Ranching"]
  },
  {
    name: "Business service",
    subDepartments: ["Accounting", "career", "career planing"]
  }
];

const DList: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setExpanded({ ...expanded, [department]: !expanded[department] });
  };

  const handleSelect = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      setSelected({ ...selected, [subDepartment]: !selected[subDepartment] });
    } else {
      const allSelected = selected[department];
      setSelected({
        ...selected,
        [department]: !allSelected,
        ...Object.fromEntries(departments.find(dep => dep.name === department)?.subDepartments.map(sub => [sub, !allSelected]) || [])
      });
    }
  };

  return (
    <Container>
      <List>
        {departments.map(department => (
          <div key={department.name}>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!!selected[department.name]}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => handleSelect(department.name)}
                />
              </ListItemIcon>
              <ListItemText primary={department.name} />
              <IconButton edge="end" onClick={() => handleToggle(department.name)}>
                {expanded[department.name] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </ListItem>
            <Collapse in={expanded[department.name]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {department.subDepartments.map(sub => (
                  <ListItem key={sub} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={!!selected[sub]}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => handleSelect(department.name, sub)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={sub} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Container>
  );
};

export default DList;
