import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const products = [
  {
    id: 1,
    name: 'Professional plan',
    desc: 'Monthly subscription',
    price: 15.00,
  },
  {
    id: 2,
    name: 'Dedicated support',
    desc: 'Included in the Professional plan',
    price: 0,
  },
  {
    id: 3,
    name: 'Hardware',
    desc: 'Devices needed for development',
    price: 69.99,
  },
  {
    id: 4,
    name: 'Landing page template',
    desc: 'License',
    price: 49.99,
  },
];

function Info({ productId }) {
  
  const product = products.find(product => product.id === productId);
  
  return (
    <React.Fragment>
      { product ? (
      <><Typography variant="subtitle2" color="text.secondary">
          Tổng tiền
        </Typography><Typography variant="h4" gutterBottom>
            {product.price} VND
          </Typography>
          <List disablePadding>
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" fontWeight="medium">
              {product.price} VND
            </Typography>
          </ListItem>
      </List>
          
          </>
      ):(<Typography variant="subtitle2" color="text.secondary">Không có sản phẩm nào</Typography>)}
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;