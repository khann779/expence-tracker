import React, { useState } from 'react';
import { Context } from './Components/Style/Contex/Contex';
import './Components/Style/style.scss';

function App() {
  const { theme, setTheme } = React.useContext(Context);
  const currencies = [
    {
      icon: 'bi-currency-yen',
      currency: 'azn',
    },
    {
      icon: 'bi-currency-euro',
      currency: 'eur',
    },
    {
      icon: 'bi-currency-dollar',
      currency: 'usd',
    },
  ];
  const [totalAmount, setTotalAmount] = useState(0);
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [list, setList] = useState([]);
  const [defaultCurrency, setDefaultCurrency] = useState({
    icon: 'bi-currency-dollar',
    currency: 'usd',
  });
  const handleIncome = (e, type) => {
    e.preventDefault();
    let newList = list;
    if (amount !== 0 && desc !== '') {
      setTotalAmount(
        type === 'income' ? totalAmount + amount : totalAmount - amount
      );
      newList.push({
        desc: desc,
        icon:
          type === 'income'
            ? 'check bi-check-circle-fill'
            : 'cross bi-x-circle-fill',
      });
      setList([...newList]);
      setAmount(amount);
      setDesc('');
    }
  };

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    if (theme === 'light') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem('theme_mode', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('theme_mode', 'light');
    }
  };

  const calculateTotalAmmount = () => {
    switch (defaultCurrency.currency) {
      case 'usd':
        return totalAmount;
      case 'eur':
        return totalAmount * 0.9;
      case 'azn':
        return totalAmount * 1.7;
    }
  };

  return (
    <div className={`App ${theme}`}>
      <div className='navbar'>
        <img
          src='https://senior.az/master%20academy_files/seniorlogohr.svg'
          alt='senior icon'
        />
        <button
          className='btn'
          onClick={() => {
            changeTheme();
          }}
        >
          {theme === 'light' ? (
            <div className='sun'>
              <i class='bi-sun-fill bisun' />
              <i class='bi-moon-fill bimoon' />
            </div>
          ) : (
            <div className='moon'>
              <i class='bi-sun-fill bisun' />
              <i class='bi-moon-fill bimoon' />
            </div>
          )}
        </button>
      </div>
      <div className='container-fluid'>
        <div className='balance'>
          <div className='balans'>
            <i class='bi bi-briefcase-fill' />
            <p>Balance</p>
          </div>
          <div className='money'>
            <div class='dropdown'>
              <button
                class='dropdown'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <i className={`bi ${defaultCurrency.icon}`} />
              </button>
              <ul class='dropdown-menu'>
                {currencies.map((item, key) => (
                  <li key={key}>
                    <a
                      class='dropdown-item'
                      href='#'
                      onClick={() => {
                        setDefaultCurrency(item);
                      }}
                    >
                      <span>
                        <i class={`bi ${item.icon}`} />
                        <p>{item.currency}</p>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className='p'>{calculateTotalAmmount()}</div>
          </div>
        </div>
        <div className='operation'>
          <div className='transaction'>
            <p>Operations</p>
            <form>
              <div className='amount'>
                <label>Amount</label>
                <input
                  type='number'
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                />
              </div>
              <div className='desc'>
                <label>Description</label>
                <textarea
                  rows='5'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className='buttons'>
                <button
                  className='btn income'
                  onClick={(e) => handleIncome(e, 'income')}
                >
                  <i class='bi bi-calculator' />
                  <p>Income</p>
                </button>
                <button
                  className='btn expense'
                  onClick={(e) => handleIncome(e, 'expense')}
                >
                  <i class='bi bi-calculator' />
                  <p>Expense</p>
                </button>
              </div>
            </form>
          </div>
          <div className='history'>
            <p>History</p>
            <div className='description'>
              {list.map((item) => (
                <div className='descr'>
                  <i class={`bi ic ${item.icon}`} />
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
