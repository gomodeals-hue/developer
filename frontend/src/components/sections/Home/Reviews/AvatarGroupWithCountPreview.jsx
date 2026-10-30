import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage
} from "@/components/tailgrids/core/avatar";
import { teamMembersGroup } from "./data";

export default function AvatarGroupWithCountPreview({ 
  members = teamMembersGroup, 
  count = "5+", 
  size = "md",
  className = "" 
}) {
  return (
    <AvatarGroup aria-label="Customer community" className={className}>
      {members.map((member, index) => (
        <Avatar key={index} size={size}>
          <AvatarImage src={member.src} alt={member.alt} />
          <AvatarFallback>
            {member.alt
              .split(" ")
              .map(name => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>{count}</AvatarGroupCount>
    </AvatarGroup>
  );
}
