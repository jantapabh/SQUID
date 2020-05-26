import React from 'react'
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Switch,
  ScrollView,
  TouchableHighlight,
} from 'react-native'
import { COLORS, FONT_FAMILY, FONT_SIZES } from '../../styles'
import { MyBackground } from '../../components/MyBackground'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContactTracer } from '../../services/contact-tracing-provider'
import { useNavigation } from 'react-navigation-hooks'
import { userPrivateData } from '../../state/userPrivateData'
import I18n from '../../../i18n/i18n'
import FoundBluetooth from './FoundBluetooth'

export const Settings = () => {
  const navigation = useNavigation()
  const { enable, disable, statusText, count, isServiceEnabled } = useContactTracer()
  const isRegistered = Boolean(userPrivateData.getData('authToken'))
  const _onPrivacyPolicyClicked = () => {
    navigation.navigate('PrivacyPolicy')
  }

  return (
    <MyBackground variant="light">
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.PRIMARY_LIGHT}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{I18n.t('tracking')}</Text>
            </View>
            <View style={styles.settingsSection}>
              <View style={[styles.section]}>
                <View style={styles.horizontalRow}>
                  <View style={styles.leftArea}>
                    <Text style={styles.sectionText}>
                      {I18n.t('track_with_bluetooth')}{' '}
                    </Text>
                  </View>
                  <View style={styles.rightArea}>
                    <Switch
                      trackColor={{
                        false: '#767577',
                        true: COLORS.PRIMARY_DARK,
                      }}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() =>
                        isServiceEnabled ? disable() : enable()
                      }
                      value={isServiceEnabled}
                    />
                  </View>
                </View>
                <Text style={styles.sectionDescription}>
                  {I18n.t('auto_turn_on_bluetooth_tracing')}
                  {I18n.t('may_cause_phone_to_consume_higher_energy')}
                  {I18n.t('you_can_choose_to_turn_off')}
                  {I18n.t('but_sys_will_not_auto_trace')}
                </Text>
                {isServiceEnabled && <FoundBluetooth count={count}/>}
              </View>
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{I18n.t('general')}</Text>
            </View>
            <View style={styles.settingsSection}>
              <TouchableHighlight onPress={_onPrivacyPolicyClicked}>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    {I18n.t('privacy_policy')}
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => navigation.navigate('Questionaire')}
              >
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    {I18n.t('do_questionaire_again')}
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => navigation.navigate('ChangeLanguage')}
              >
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    {I18n.t('change_lang')}
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => navigation.navigate('SetLocationHome')}
              >
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Set Location
                  </Text>
                </View>
              </TouchableHighlight>
              {!isRegistered && (
                <TouchableHighlight
                  onPress={() =>
                    navigation.navigate('OnboardPhone', {
                      onBack: () => {
                        navigation.pop()
                      },
                      backIcon: 'close',
                    })
                  }
                >
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      {I18n.t('identity_confirm')}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </MyBackground>
  )
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionHeader: {
    height: 56,
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    color: '#AAAAAA',
    fontSize: FONT_SIZES[600],
    fontFamily: FONT_FAMILY,
  },
  settingsSection: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  horizontalRow: {
    flexDirection: 'row',
  },
  leftArea: {
    flex: 1,
  },
  rightArea: {
    justifyContent: 'flex-start',
  },
  sectionText: {
    fontSize: FONT_SIZES[600],
    color: '#000000',
    fontFamily: FONT_FAMILY,
  },
  sectionDescription: {
    marginTop: 4,
    fontSize: FONT_SIZES[500],
    color: '#888888',
    fontFamily: FONT_FAMILY,
  },
  mediumText: {
    fontSize: FONT_SIZES[600],
    color: '#000000',
  },
  largeText: {
    fontSize: FONT_SIZES[700],
    color: '#000000',
    fontFamily: FONT_FAMILY,
  },
  sectionTitle: {
    fontSize: FONT_SIZES[700],
    fontWeight: '600',
    color: '#000000',
    fontFamily: FONT_FAMILY,
  },
  scrollView: {},
})
