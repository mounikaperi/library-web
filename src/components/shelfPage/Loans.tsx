import { useOktaAuth } from '@okta/okta-react'
import React, { useEffect, useState } from 'react'
import ShelfCurrentLoans from '../../models/ShelfCurrentLoans';

function Loans() {

  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      try {

      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoadingUserLoans(false);
      }

      window.scrollTo(0, 0);
    }
    fetchUserCurrentLoans();
  }, [authState]);

  return (
    <div>
      
    </div>
  )
}

export default Loans
