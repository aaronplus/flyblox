import React, { useEffect } from 'react'

import dynamic from 'next/dynamic'
import useGetOrders from '~/hooks/useOrders'
import useGetUsers from '~/hooks/useUser'
import { Spin } from 'antd'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const CardSaleReport = () => {
  const { sales, loading, getSales } = useGetOrders()
  const { usersCount, usersDaysCount, usersWeeksCount, loadingForUsers, getUsersCount } = useGetUsers()

  useEffect(() => {
    getSales()
    getUsersCount()
  }, [])

  let state
  let userState
  let userDaysState
  let userWeeksState
  if (loading === false && sales) {
    let data = []
    let categories = []
    for (const [key, value] of Object.entries(sales)) {
      data.push(value)
      categories.push(key)
    }
    state = {
      series: [
        {
          name: 'sales per month',
          data: data
        }
      ],

      options: {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#fcb800', '#f9f9f9', '#9C27B0'],
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: categories
        },
        tooltip: {
          x: {
            format: 'MM/yyyy'
          }
        },
        responsive: [
          {
            breakpoint: 1680,
            options: {
              chart: {
                width: '95%'
              }
            }
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '95%'
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    }
  }


  if (loadingForUsers === false && usersCount) {
    let userData = []
    let userCategories = []
    for (const [key, value] of Object.entries(usersCount)) {
      userData.push(value)
      userCategories.push(key)
    }
    userState = {
      userSeries: [
        {
          name: 'users',
          data: userData
        }
      ],

      userOptions: {
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false,

        },
        colors: ['#fcb800', '#f9f9f9', '#9C27B0'],
        xaxis: {
          categories: userCategories
        },
        tooltip: {
          x: {
            format: 'MM/yyyy'
          }
        },
        responsive: [
          {
            breakpoint: 1680,
            options: {
              chart: {
                width: '95%'
              }
            }
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '95%'
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    }
  }

  if (loadingForUsers === false && usersDaysCount) {
    let userDaysData = []
    let userDaysCategories = []
    for (const [key, value] of Object.entries(usersDaysCount)) {
      userDaysData.push(value.count)
      userDaysCategories.push(value.days)
    }
    userDaysState = {
      userDaysSeries: [
        {
          name: 'users',
          data: userDaysData
        }
      ],

      userDaysOptions: {
        chart: {
          id: "basic-bar",
          height: 350,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false,

        },
        colors: ['#fcb800', '#f9f9f9', '#9C27B0'],

        xaxis: {
          type: 'datetime',
          categories: userDaysCategories
        },
        yaxis: [
          {
            labels: {
              formatter: function (val) {
                return val.toFixed(0);
              }
            }
          }
        ],
        tooltip: {
          x: {
            format: 'DD/MM'
          }
        },
        responsive: [
          {
            breakpoint: 1680,
            options: {
              chart: {
                width: '95%'
              }
            }
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '95%'
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    }
  }

  if (loadingForUsers === false && usersWeeksCount) {
    let userWeeksData = []
    let userWeeksCategories = []
    for (const [key, value] of Object.entries(usersWeeksCount)) {
      userWeeksData.push(value.count)
      userWeeksCategories.push(value.days)
    }
    userWeeksState = {
      userWeeksSeries: [
        {
          name: 'users',
          data: userWeeksData
        }
      ],

      userWeeksOptions: {
        chart: {
          id: "basic-bar",
          height: 350,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false,

        },
        colors: ['#fcb800', '#f9f9f9', '#9C27B0'],
        // stroke: {
        //   curve: 'smooth'
        // },
        xaxis: {
          // type: 'datetime',
          categories: userWeeksCategories

        },
        yaxis: [
          {
            labels: {
              formatter: function (val) {
                return val.toFixed(0);
              }
            }
          }
        ],
        tooltip: {
          x: {
            format: 'MM/yyyy'
          }
        },
        responsive: [
          {
            breakpoint: 1680,
            options: {
              chart: {
                width: '95%'
              }
            }
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '95%'
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    }
  }
  return (
    <div className='ps-card ps-card--sale-report'>
      <div className='ps-card__header'>
        <h4>Sales Reports</h4>
      </div>
      {loading === false && sales ? (
        <>
          <div className='ps-card__content'>
            <div id='chart'></div>
            <Chart
              options={state.options}
              series={state.series}
              type='area'
              height={320}
            />
          </div>

          <div className='ps-card__footer'>
            <div className='row'>
              <div className='col-md-8'>
                <p>Items Earning Sales ($)</p>
              </div>
              <div className='col-md-4'>
                <a href='#'>
                  Export Report
                  <i className='icon icon-cloud-download ml-2'></i>
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        // <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        //   {/* <Spin /> */}
        //   <span>No Data found</span>
        // </div>
        <>
        </>
      )}

      <div className='ps-card__header'>
        <h4>12 Days New User Registrations Reports</h4>
      </div>
      {loadingForUsers === false && usersDaysCount ? (
        <>
          <div className='ps-card__content'>
            <div id='chart'></div>
            <Chart
              options={userDaysState.userDaysOptions}
              series={userDaysState.userDaysSeries}
              type='bar'
              height={320}
            />
          </div>
        </>
      ) : (
          // <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          //   {/* <Spin /> */}
          //   <span>No Data found</span>
          // </div>
          <>
          </>
      )}

      <div className='ps-card__header'>
        <h4>12 Weeks New User Registrations Reports</h4>
      </div>
      {loadingForUsers === false && usersWeeksCount ? (
        <>
          <div className='ps-card__content'>
            <div id='chart'></div>
            <Chart
              options={userWeeksState.userWeeksOptions}
              series={userWeeksState.userWeeksSeries}
              type='bar'
              height={320}
            />
          </div>
        </>
      ) : (
          // <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          //   {/* <Spin /> */}
          //   <span>No Data found</span>
          // </div>
          <>
          </>
      )}

      <div className='ps-card__header'>
        <h4>12 Months New  User Registrations Reports</h4>
      </div>
      {loadingForUsers === false && usersCount ? (
        <>
          <div className='ps-card__content'>
            <div id='chart'></div>
            <Chart
              options={userState.userOptions}
              series={userState.userSeries}
              type='bar'
              height={320}
            />
          </div>
        </>
      ) : (
          // <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          //   {/* <Spin /> */}
          //   <span>No Data found</span>
          // </div>
          <></>
      )}

    </div>
  )
}

export default CardSaleReport
