import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);
console.log('funcioon', RenderAuthorized)
console.log('Authority', Authority, Authorized)
console.log('比较', Authorized)

export default ({ children }) => (
  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
    {console.log('childddren', children)}
    {children}
  </Authorized>
);
