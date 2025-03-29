import React from 'react';

interface GroupPillsProps {
  groups: Array<string>;
}

const GroupPills: React.FC<GroupPillsProps> = ({ groups }) => {
  return (
    <div className="group-pills">
      {groups.map((group, index) => (
        <span key={index} className="group-pill">
          {group}
        </span>
      ))}
    </div>
  );
};

export default GroupPills;
