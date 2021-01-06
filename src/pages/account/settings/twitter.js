import React, { useState } from 'react'
import useApp from '../../../hooks/useApp'
import AppWrapper from '../../../components/app/wrapper'

import { FormattedMessage } from 'react-intl'
import Blockquote from '@freesewing/components/Blockquote'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const Page = (props) => {
  const app = useApp()

  // FIXME: Show something better than nothing in SSR
  if (!app.account.username) return null

  const [twitter, setTwitter] = useState(app.account.social ? app.account.social.twitter || '' : '')

  return (
    <AppWrapper app={app} title={app.translate('account.twitter')} {...app.treeProps(props.path)}>
      <TextField
        id="twitter"
        fullWidth={true}
        label={app.translate('account.twitter')}
        margin="normal"
        variant="outlined"
        value={twitter}
        type="text"
        onChange={(evt) => setTwitter(evt.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>
        }}
      />
      <p style={{ textAlign: 'right' }}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href="/account/settings"
          data-test="cancel"
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          data-test="save"
          size="large"
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={() => app.updateAccount([twitter, 'social', 'twitter'], '/account/settings/')}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
      <Blockquote type="note">
        <FormattedMessage id={'account.twitterInfo'} />
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
