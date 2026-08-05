import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';

export default {
  V4: () => uuidv4(),
  V7: () => uuidv7()
};
