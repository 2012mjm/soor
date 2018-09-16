
export const fakeGetCurrentUser = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({data: {
      'id': 4,
      'userName': 'adminUser',
      'firstName': 'اسم',
      'lastName': 'تولید شده',
      'email': 'faked@example.com'
    }})
  }, 800)
})

export const fakeSuccessRequest = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 800)
})
